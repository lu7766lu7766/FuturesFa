<template>
  <ve-line
      :data="chipChartData"
      :after-config="optionConfig"
      :colors="colors"
      :height="height"></ve-line>
</template>

<script>
import ChipMixins from "mixins/chip"

export default {
  props: ["data", "height", "subTitle"],
  mixins: [ChipMixins],
  methods: {
    optionConfig(options) {
      return this.getConfig(options, "選擇權多空力道圖", this.subTitle)
    },
  },
  computed: {
    chipChartData() {
      return {
        columns: ["時間", "總Ｃ", "總Ｐ", "選擇權多空力道"],
        rows: _.reduce(
          this.data,
          (result, val) => {
            result.push({
              時間: val.created_at.split(" ")[1],
              總Ｃ: val.total_c,
              總Ｐ: val.total_p,
              選擇權多空力道: val.differ_cp,
            })
            return result
          },
          []
        ),
      }
    },
  },
}
</script>
