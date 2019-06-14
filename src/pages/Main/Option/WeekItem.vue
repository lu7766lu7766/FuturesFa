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
      <quotation :data="itemInformedDatas"
                 :info="info"
                 :centerPoint="centerPoint"
                 :showTime="false"
                 :showRange="8"></quotation>
    </div>
    <div class="col-md-10">
      <!-- 當日籌碼 -->
      <div class="row">
        <div class="col-md-7 col-xs-12">
          <option-histogram
              :data="itemChartData"
              :config="getTodayConfig"
              :height="height"></option-histogram>
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
              :data="accumulationChartData"
              :config="getAccumulationConifg"
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
  import OptionNewMixins from 'mixins/option/new'

  export default {
    mixins: [OptionNewMixins],
    components: {
      OptionHistogram: () => import('@/OptionHistogram'),
      FuturesChip: () => import('@/FuturesChip'),
      OptionChip: () => import('@/OptionChip'),
      TXO: () => import('@/TXO'),
      Quotation: () => import('@/Quotation')
    },
    data: () => ({
      timer: null,
      timer2: null,
      txo: {},
      height: '325px',
      futuresChip: [],
      optionChip: []
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
        }, getenv('optionUpdateSecs', 30) * 1000)
        this.timer2 = setInterval(() =>
        {
          this.getChipAccumulation()
          this.getDataInfo()
        }, getenv('accumulationUpdateSecs', 3600) * 1000)
      },

    },
    computed: {
      centerPoint()
      {
        return Math.floor(this.txo.mtx / 100) * 100
      },
      showChipList()
      {
        return this.getShowChipList(this.allItems, 5)
      },
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
    async mounted()
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
    },
    destroyed()
    {
      clearInterval(this.timer)
      clearInterval(this.timer2)
    }
  }
</script>

