<template>
  <ve-histogram
      :data="chartData"
      :after-config="!chipAccumulationDatas.length ? getTodayConfig : getAccumulationConifg"
      :height="height"></ve-histogram>
</template>

<script>
  import OptionChartMixins from 'mixins/option/chart'

  export default {
    mixins: [OptionChartMixins]
  }
</script>
