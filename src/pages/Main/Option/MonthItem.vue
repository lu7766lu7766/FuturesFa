<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      現在時間：{{ currentTime }} &nbsp;&nbsp;
      資料時間：{{ updateTime }}
    </div>
    <div class="col-md-12 col-xs-12">
      <option-histogram
          v-if="showMonth"
          :itemInformedDatas="itemInformedDatas"
          :info="info"
          :showMonth="showMonth"
          @update:updateTime="time => updateTime = time"></option-histogram>
    </div>
    <div class="col-md-12 col-xs-12">
      <option-histogram
          v-if="showMonth"
          :itemInformedDatas="itemInformedDatas"
          :chipAccumulationDatas="chipAccumulationDatas"
          :info="info"
          :showMonth="showMonth"></option-histogram>
    </div>
  </div>
</template>

<script>
  import CurrentTimeMixins from 'mixins/currentTime'
  import OptionInitMixins from 'mixins/option/init'

  export default {
    mixins: [CurrentTimeMixins, OptionInitMixins],
    components: {
      OptionHistogram: () => import('@/OptionHistogram')
    },
    data: () => ({
      updateTime: '',
      timer: null
    }),
    methods: {
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
          this.getDataInfo()
          this.getChipAccumulation()
        }, getenv('optionUpdateSecs', 30) * 1000)
      }
    },
    computed: {
      showMonth()
      {
        return this.info.subMonth
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
    }
  }
</script>