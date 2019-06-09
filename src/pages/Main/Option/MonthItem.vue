<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      現在時間：{{ currentTime }} &nbsp;&nbsp;
      資料時間：{{ updateTime }}
    </div>
    <div class="col-md-12 col-xs-12">
      <option-histogram
          :data="MonthInformedChartData"
          :config="getMonthTodayConfig"></option-histogram>
    </div>
    <div class="col-md-12 col-xs-12">
      <option-histogram
          :data="MonthChipAccumulationChartData"
          :config="getMonthAccumulationConifg"></option-histogram>
    </div>
  </div>
</template>

<script>
  import OptionPageMixins from 'mixins/option/page'
  import OptionMonthMixins from 'mixins/option/month'


  export default {
    mixins: [OptionPageMixins, OptionMonthMixins],
    components: {
      OptionHistogram: () => import('@/OptionHistogram')
    },
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
          this.getItemInformed({
            key: 'ItemInformed'
          })
        }, getenv('optionUpdateSecs', 30) * 1000)
        this.timer2 = setInterval(() =>
        {
          this.getChipAccumulation({
            key: 'ChipAccumulation'
          })
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