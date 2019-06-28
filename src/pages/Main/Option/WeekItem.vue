<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      現在時間：{{ currentTime }} &nbsp;&nbsp;
      資料時間：{{ updateTime }}
    </div>

    <div class="col-md-12 col-xs-12">
      <div class="table-responsive">
        <TXO :txo="txo" />
      </div>
    </div>

    <div class="col-md-2">
      <quotation
          :itemInformedDatas="itemInformedDatas"
          :info="info"
          :showTime="false"
          :range="8"></quotation>
    </div>
    <div class="col-md-10">
      <!-- 當日籌碼 -->
      <div class="row">
        <div class="col-md-7 col-xs-12">
          <option-histogram
              v-if="showMonth"
              :itemInformedDatas="itemInformedDatas"
              :info="info"
              :showMonth="showMonth"
              :showWeek="showWeek"
              :range="5"
              :height="height"
              @update:updateTime="time => updateTime = time"></option-histogram>
        </div>
        <div class="col-md-5 col-xs-12">
          <futures-chip
              :data="futuresChip"
              :subTitle="info.date"
              :height="height" />
        </div>
        <!-- 累計籌碼 -->
        <div class="col-md-7 col-xs-12">
          <option-histogram
              v-if="showMonth"
              :itemInformedDatas="itemInformedDatas"
              :chipAccumulationDatas="chipAccumulationDatas"
              :info="info"
              :showMonth="showMonth"
              :showWeek="showWeek"
              :range="5"
              :height="height"></option-histogram>
        </div>
        <div class="col-md-5 col-xs-12">
          <option-chip
              :data="optionChip"
              :subTitle="info.date"
              :height="height" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import CurrentTimeMixins from 'mixins/currentTime'
  import OptionInitMixins from 'mixins/option/init'

  export default {
    mixins: [CurrentTimeMixins, OptionInitMixins],
    components: {
      OptionHistogram: () => import('@/OptionHistogram'),
      FuturesChip: () => import('@/FuturesChip'),
      OptionChip: () => import('@/OptionChip'),
      TXO: () => import('@/TXO'),
      Quotation: () => import('@/QuotationTable')
    },
    data: () => ({
      timer: null,
      updateTime: '',
      txo: {},
      futuresChip: [],
      optionChip: [],
      height: '325px'
    }),
    methods: {
      async getTXO()
      {
        const res = await this.$api.data.getTXO()
        this.txo = res.data
      },
      async getFuturesChip()
      {
        const res = await this.$api.data.getFuturesChip()
        this.futuresChip = res.data
      },
      async getOptionChip()
      {
        const res = await this.$api.data.getOptionChip()
        this.optionChip = res.data
      },
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
          this.getTXO()
          this.getFuturesChip()
          this.getOptionChip()
          this.getDataInfo()
          this.getChipAccumulation()
        }, getenv('optionUpdateSecs', 30) * 1000)
      }
    },
    computed: {
      showMonth()
      {
        return this.info.mainMonth
      },
      showWeek()
      {
        return this.info.isMonthSettleTime
          ? ''
          : this.info.mainWeek
      }
    },
    async created()
    {
      this.callApi(async () =>
      {
        await axios.all([
          this.getTXO(),
          this.getItemInformed(),
          this.getChipAccumulation(),
          this.getFuturesChip(),
          this.getOptionChip(),
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

