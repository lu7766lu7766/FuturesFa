<template>
  <div class="gauge-container">
    <canvas ref="gaugeCanvas"></canvas>
    <div class="row gauge-label">
      <div class="col-3">空</div>
      <div class="col-6">溫度計</div>
      <div class="col-3">多</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GaugeChart",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: -10000,
    },
    max: {
      type: Number,
      default: 10000,
    },
  },
  data() {
    return {
      resizeObserver: null,
      gaugeSections: [
        {
          color: "#00FF00",
          start: -10000,
          end: -20,
          label: "偏空",
          labelPos: "left",
          startAngle: Math.PI,
          endAngle: Math.PI + Math.PI * 0.4, // 計算到 -20 的角度
        },
        {
          color: "#FFFF00",
          start: -20,
          end: 20,
          label: "盤整中立",
          labelPos: "center",
          startAngle: Math.PI + Math.PI * 0.4,
          endAngle: Math.PI + Math.PI * 0.6, // -20 到 20 的角度
        },
        {
          color: "#FF0000",
          start: 20,
          end: 10000,
          label: "偏多",
          labelPos: "right",
          startAngle: Math.PI + Math.PI * 0.6,
          endAngle: 2 * Math.PI,
        },
      ],
    }
  },
  watch: {
    value(newValue) {
      this.drawGauge(newValue)
    },
  },
  mounted() {
    this.setCanvasSize()
    this.drawGauge(this.value)

    window.addEventListener("resize", this.handleResize)
    this.resizeObserver = new ResizeObserver(this.handleResize)
    this.resizeObserver.observe(this.$refs.gaugeCanvas.parentElement)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize)
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  },
  methods: {
    setCanvasSize() {
      const canvas = this.$refs.gaugeCanvas
      const parent = canvas.parentElement
      const width = parent.clientWidth
      const height = width / 1.5

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr

      const ctx = canvas.getContext("2d")
      ctx.scale(dpr, dpr)
    },
    handleResize() {
      this.setCanvasSize()
      this.drawGauge(this.value)
    },
    drawGauge(value) {
      const canvas = this.$refs.gaugeCanvas
      const ctx = canvas.getContext("2d")
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      const centerX = width / 2
      const centerY = height
      const radius = width / 2 - 10

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw colored sections using stored angles
      this.gaugeSections.forEach((section) => {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius - 5, section.startAngle, section.endAngle, false)
        ctx.fillStyle = section.color
        ctx.fill()
        ctx.closePath()
      })

      // Draw black semicircle background
      const blackRadius = (radius * 3) / 4
      ctx.beginPath()
      ctx.arc(centerX, centerY, blackRadius, Math.PI, 2 * Math.PI, false)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = "#000"
      ctx.fill()
      ctx.closePath()

      // Draw scale marks inside black semicircle (-100 to 100)
      const scaleRadius = blackRadius
      const scaleStartAngle = Math.PI
      const scaleEndAngle = 2 * Math.PI
      const numTicks = 10
      const angleIncrement = (scaleEndAngle - scaleStartAngle) / numTicks
      const scaleValues = Array.from({ length: numTicks + 1 }, (_, i) => -100 + (i * 200) / numTicks)

      for (let i = 0; i <= numTicks; i++) {
        const angle = scaleStartAngle + i * angleIncrement
        const startX = centerX + (scaleRadius - 15) * Math.cos(angle)
        const startY = centerY + (scaleRadius - 15) * Math.sin(angle)
        const endX = centerX + scaleRadius * Math.cos(angle)
        const endY = centerY + scaleRadius * Math.sin(angle)

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = "#FFF"
        ctx.lineWidth = 1
        ctx.stroke()

        const textX = centerX + (scaleRadius - 25) * Math.cos(angle)
        const textY = centerY + (scaleRadius - 25) * Math.sin(angle)
        ctx.font = "10px Arial"
        ctx.fillStyle = "#FFF"
        ctx.textAlign = "center"
        ctx.fillText(scaleValues[i].toString(), textX, textY)
      }

      // Draw labels for each section
      this.gaugeSections.forEach((section) => {
        let textX, textY, textAlign
        const labelRadius = radius - 10

        if (section.labelPos === "left") {
          textX = centerX + (labelRadius + 30) * Math.cos(section.startAngle + 0.4 * (section.endAngle - section.startAngle))
          textY = centerY + (labelRadius + 30) * Math.sin(section.startAngle + 0.4 * (section.endAngle - section.startAngle))
          textAlign = "left"
        } else if (section.labelPos === "center") {
          textX = centerX
          textY = centerY - labelRadius - 10
          textAlign = "center"
        } else {
          textX = centerX + (labelRadius + 30) * Math.cos(section.startAngle + 0.6 * (section.endAngle - section.startAngle))
          textY = centerY + (labelRadius + 30) * Math.sin(section.startAngle + 0.6 * (section.endAngle - section.startAngle))
          textAlign = "right"
        }

        ctx.font = "14px Arial"
        ctx.fillStyle = "#000"
        ctx.textAlign = textAlign
        ctx.fillText(section.label, textX, textY)
      })

      // Calculate needle angle
      let angle
      const normalizedValue = Math.min(Math.max(value, this.min), this.max)

      this.gaugeSections.forEach((section) => {
        if (normalizedValue >= section.start && normalizedValue <= section.end) {
          const rangeLength = section.end - section.start
          const valueInRange = normalizedValue - section.start
          const ratio = valueInRange / rangeLength
          angle = section.startAngle + ratio * (section.endAngle - section.startAngle)
        }
      })

      // Draw needle
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      const needleLength = radius - 10
      const needleEndX = centerX + needleLength * Math.cos(angle)
      const needleEndY = centerY + needleLength * Math.sin(angle)
      ctx.lineTo(needleEndX, needleEndY)
      ctx.strokeStyle = "#ccc"
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.closePath()

      // Draw center point
      ctx.beginPath()
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI, false)
      ctx.fillStyle = "#FFF"
      ctx.fill()
      ctx.closePath()
    },
  },
}
</script>

<style scoped>
.gauge-container {
  width: 100%;
  text-align: center;
}
.gauge-label {
  color: #ff6565;
  font-size: 1rem;
}

canvas {
  display: block;
  width: 100%;
}
</style>
