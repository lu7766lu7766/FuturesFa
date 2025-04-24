<template>
  <div class="gauge-container">
    <canvas ref="gaugeCanvas"></canvas>
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
      const height = width / 2

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

      // 清空畫布
      ctx.clearRect(0, 0, width, height)

      // 定義三個顏色區塊的角度（均分為三等分）
      const startAngle = Math.PI
      const totalAngle = Math.PI
      const sectionAngle = totalAngle / 3 // 每區塊 60°

      // 繪製綠色區塊（第一段）
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius - 5, startAngle, startAngle + sectionAngle, false)
      ctx.fillStyle = "#00FF00"
      ctx.fill()
      ctx.closePath()

      // 繪製黃色區塊（第二段）
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius - 5, startAngle + sectionAngle, startAngle + 2 * sectionAngle, false)
      ctx.fillStyle = "#FFFF00"
      ctx.fill()
      ctx.closePath()

      // 繪製紅色區塊（第三段）
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius - 5, startAngle + 2 * sectionAngle, startAngle + 3 * sectionAngle, false)
      ctx.fillStyle = "#FF0000"
      ctx.fill()
      ctx.closePath()

      // 繪製背景黑色半圓
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius / 2, Math.PI, 2 * Math.PI, false)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = "#000"
      ctx.fill()
      ctx.closePath()

      // 定義數值範圍
      const ranges = [
        { start: this.min, end: -1000 }, // 綠色：-5000 到 -500
        { start: -1000, end: 1000 }, // 黃色：-500 到 500
        { start: 500, end: this.max }, // 紅色：500 到 5000
      ]

      // 計算指針角度（根據數值範圍映射到均分的角度）
      let angle
      const normalizedValue = Math.min(Math.max(value, this.min), this.max)

      if (normalizedValue <= ranges[0].end) {
        // 綠色區塊：線性映射 -10000 到 -1000 到第一段角度
        const rangeLength = ranges[0].end - ranges[0].start
        const valueInRange = normalizedValue - ranges[0].start
        const ratio = valueInRange / rangeLength
        angle = startAngle + ratio * sectionAngle
      } else if (normalizedValue <= ranges[1].end) {
        // 黃色區塊：線性映射 -1000 到 1000 到第二段角度
        const rangeLength = ranges[1].end - ranges[1].start
        const valueInRange = normalizedValue - ranges[1].start
        const ratio = valueInRange / rangeLength
        angle = startAngle + sectionAngle + ratio * sectionAngle
      } else {
        // 紅色區塊：線性映射 1000 到 10000 到第三段角度
        const rangeLength = ranges[2].end - ranges[2].start
        const valueInRange = normalizedValue - ranges[2].start
        const ratio = valueInRange / rangeLength
        angle = startAngle + 2 * sectionAngle + ratio * sectionAngle
      }

      // 繪製指針
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

      // 繪製中心點
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

canvas {
  display: block;
  width: 100%;
}
</style>
