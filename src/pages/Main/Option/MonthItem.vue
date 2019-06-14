<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      現在時間：{{ currentTime }} &nbsp;&nbsp;
      資料時間：{{ updateTime }}
    </div>
    <div class="col-md-12 col-xs-12">
      <option-histogram
          :data="itemChartData"
          :config="getTodayConfig"></option-histogram>
    </div>
    <div class="col-md-12 col-xs-12">
      <option-histogram
          :data="accumulationChartData"
          :config="getAccumulationConifg"></option-histogram>
    </div>
  </div>
</template>

<script>
  import OptionNewMixins from 'mixins/option/new'


  export default {
    mixins: [OptionNewMixins],
    components: {
      OptionHistogram: () => import('@/OptionHistogram')
    },
    data: () => ({
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
          this.getDataInfo()
        }, getenv('accumulationUpdateSecs', 30) * 1000)
      }
    },
    computed: {
      showMonth()
      {
        return this.info.isMonthSettleTime
          ? this.info.subMonth
          : this.info.mainMonth
      },
      showWeek()
      {
        return ''
      }
    },
    created()
    {
      this.callApi(async () =>
      {
        await axios.all([
          this.getItemInformed(),
          this.getChipAccumulation(),
          this.getDataInfo()
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