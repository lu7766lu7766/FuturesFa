<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      現在時間：{{ currentTime }} &nbsp;&nbsp;
      資料時間：{{ updateTime }}
    </div>
    <div class="col-md-12 col-xs-12">
      <ve-histogram
          :data="informedChartData"
          :after-config="todayConfig"></ve-histogram>
    </div>
    <div class="col-md-12 col-xs-12">
      <ve-histogram
          :data="chipAccumulationChartData"
          :after-config="accumulationConifg"></ve-histogram>
    </div>
  </div>
</template>

<script>
  import OptionMixins from 'mixins/option'
  import OptionType from 'Constants/OptionType'

  export default {
    mixins: [OptionMixins],
    data: () => ({
      optionType: OptionType.MONTH,
      timer: null,
      timer2: null
    }),
    methods: {
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
        }, getenv('waitSecs', 30) * 1000)
        this.timer2 = setInterval(() =>
        {
          this.getChipAccumulation()
        }, 60 * 60 * 1000)
      }
    },
    created()
    {
      this.callApi(async () =>
      {
        await axios.all([
          this.getItemInformed(),
          this.getChipAccumulation()
        ])
        this.startCounter()
      })
    },
    destroyed()
    {
      clearInterval(this.timer)
      clearInterval(this.timer2)
    }
  }
</script>