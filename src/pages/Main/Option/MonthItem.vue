<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      現在時間：{{ currentTime }} &nbsp;&nbsp;
      資料時間：{{ updateTime }}
    </div>
    <div class="col-md-12 col-xs-12">
      <ve-histogram
          :data="InformedChartData"
          :after-config="getTodayConfig"></ve-histogram>
    </div>
    <div class="col-md-12 col-xs-12">
      <ve-histogram
          :data="ChipAccumulationChartData"
          :after-config="getAccumulationConifg"></ve-histogram>
    </div>
  </div>
</template>

<script>
  import OptionMixins from 'mixins/option'
  import OptionType from 'Constants/OptionType'

  export default {
    mixins: [OptionMixins],
    data: () => ({
      isWeekItem: false,
      timer: null,
      timer2: null
    }),
    methods: {
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
        }, getenv('optionUpdateSecs', 30) * 1000)
        this.timer2 = setInterval(() =>
        {
          this.getChipAccumulation()
        }, getenv('accumulationUpdateSecs', 30) * 1000)
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