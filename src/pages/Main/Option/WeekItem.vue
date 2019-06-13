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
                 :centerPoint="centerPoint"
                 :showRange="8"></quotation>
    </div>
    <div class="col-md-10">
      <!-- 當日籌碼 -->
      <div class="row">
        <div class="col-md-7 col-xs-12">
          <option-histogram
              :data="WeekInformedChartData"
              :config="getWeekTodayConfig"
              :height="height"></option-histogram>
        </div>
        <div class="col-md-5 col-xs-12">
          <futures-chip
              :data="futuresChip"
              :subTitle="theDate"
              :height="height" />
        </div>
        <!-- 累計籌碼 -->
        <div class="col-md-7 col-xs-12">
          <option-histogram
              :data="WeekChipAccumulationChartData"
              :config="getWeekAccumulationConifg"
              :height="height"></option-histogram>
        </div>
        <div class="col-md-5 col-xs-12">
          <option-chip
              :data="optionChip"
              :subTitle="theDate"
              :height="height" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import OptionPageMixins from 'mixins/option/page'

  export default {
    mixins: [OptionPageMixins],
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
      optionChip: [],
      info: {}
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
      async getDataInfo()
      {
        const res = await this.$api.data.getDataInfo()
        this.info = res.data
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
        const items = _.map(this.currentDatas, 'item')
        const showRange = 5
        let mustNeerItem = 0, neerIndex = 0

        items.forEach((item, index) =>
        {
          if (Math.abs(this.centerPoint - item) < Math.abs(this.centerPoint - mustNeerItem))
          {
            mustNeerItem = item
            neerIndex = index
          }
        })
        const startIndex = (neerIndex - showRange) < 0
          ? 0
          : neerIndex - showRange
        const endIndex = (neerIndex + showRange) >= list.length
          ? list.length - 1
          : neerIndex + showRange
        //
        // // 前5後5所以11
        return _.cloneDeep(items).splice(startIndex, endIndex)
      },
      showMonth()
      {
        return this.info.mainMonth
      },
      showWeek()
      {
        return this.info.isMonthSettleTime
          ? this.info.mainWeek
          : ''
      },
      currentDatas()
      {
        return this.info.isMonthSettleTime
          ? _.filter(itemInformedDatas, data =>
          {
            return data.month == this.showMonth
          })
          : _.filter(itemInformedDatas, data =>
          {
            return data.month == this.showMonth && data.week == this.showWeek
          })
      },
      chartData()
      {
        return {
          columns: ['item', 'C', 'P'],
          rows: _.reduce(this.currentDatas, (result, item) =>
          {
            if (!this.showChipList || this.showChipList.indexOf(item) > -1)
            {
              // 新倉跟舊倉可能同時存在資料，所以取前者
              result.push({
                item,
                C: _(this.CGroupWeekItemInformed).getVal(`${item}.0.chip_valume`, 0),
                P: _(this.PGroupWeekItemInformed).getVal(`${item}.0.chip_valume`, 0)
              })
            }
            return result
          }, [])
        }
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
        this.checkIsMonthEndWeek(),
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

