import ReqMixins from 'src/mixins/request'

export default {
  mixins: [ReqMixins],
  data: () => ({
    currentTimer: null,
    currentTime: '',
    itemInformedDatas: [],
    chipAccumulationDatas: [],
    info: {}
  }),
  methods: {
    // 當日籌碼資料取得
    async getItemInformed()
    {
      const res = await this.$api.data.getOptionItemInformed()
      this.itemInformedDatas = res.data
    },
    // 累計籌碼資料取得
    async getChipAccumulation()
    {
      const res = await this.$api.data.getOptionChipAccumulation()
      this.chipAccumulationDatas = res.data
    },
    async getDataInfo()
    {
      const res = await this.$api.data.getDataInfo()
      this.info = res.data
    },
    getTitleString(title)
    {
      const weekString = this.showWeek
        ? 'W' + this.showWeek
        : ''
      title = title + '(' + this.showMonth + weekString + ')'
      return title
    },
    getTodayConfig(options, title = '當日籌碼')
    {
      return this.getConfig(options, this.getTitleString(title), this.info.date)
    },
    getAccumulationConifg(options, title = '累計籌碼')
    {
      return this.getConfig(options, this.getTitleString(title), this.info.date)
    },
    // chart的config
    getConfig(options, title, subTitle)
    {
      // 0C 1P
      _.forEach([0, 1], index =>
      {
        options.series[index].barCategoryGap = '50%'
        options.series[index].data = options.series[index].data.map((value) =>
        {
          let color
          switch (index)
          {
            // C
            case 0:
              color = value > 0
                ? '#f00'
                : '#00CF00'
              break
            // P
            case 1:
              color = value > 0
                ? '#00cf00'
                : '#f00'
              break
          }
          return {
            label: {
              show: true,
              position: value > -1
                ? 'top'
                : 'bottom'
            },
            value,
            itemStyle: {
              normal: {
                color
              }
            }
          }
        })
      })
      options.title = {
        text: title,
        subtext: subTitle //'二级标题'
      }
      options.legend = { //圖例
        // data: [''] // 柱狀顏色提示 series name相map
        show: false
      }
      return options
    },
    getShowChipList(items, range = 100)
    {
      let mustNeerItem = 0, neerIndex = 0
      items.forEach((item, index) =>
      {
        if (Math.abs(this.centerPoint - item) < Math.abs(this.centerPoint - mustNeerItem))
        {
          mustNeerItem = item
          neerIndex = index
        }
      })
      const startIndex = (neerIndex - range) < 0
        ? 0
        : neerIndex - range

      return _.cloneDeep(items).splice(startIndex, range * 2 + 1)
    }
  },
  computed: {
    currentItemInformedDatas()
    {
      return _.filter(this.itemInformedDatas, data =>
      {
        // this.isWeekItem for quotation
        // this.info.isMonthSettleTime for option page
        return this.isWeekItem || !this.info.isMonthSettleTime
          ? data.month == this.showMonth && data.week == this.showWeek
          : data.month == this.showMonth
      })
    },
    currentAccumulationDatas()
    {
      return _.filter(this.chipAccumulationDatas, data =>
      {
        return this.isWeekItem || !this.info.isMonthSettleTime
          ? data.month == this.showMonth && data.week == this.showWeek
          : data.month == this.showMonth
      })
    },
    updateTime()
    {
      return moment(_(this.currentItemInformedDatas).getVal('0.created_at')).getDateTime()
    },
    allItems()
    {
      return _.orderBy(_.keys(_.keyBy(this.currentItemInformedDatas, 'item')))
    },
    groupItemTypeItemInformed()
    {
      return _.mapValues(_.groupBy(this.currentItemInformedDatas, 'item'), data => _.keyBy(data, 'type'))
    },
    groupItemTypeAccumulation()
    {
      return _.mapValues(_.groupBy(this.currentAccumulationDatas, 'item'), data => _.keyBy(data, 'type'))
    },
    itemChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(this.allItems, (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            // 新倉跟舊倉可能同時存在資料，所以取前者
            result.push({
              item,
              C: _(this.groupItemTypeItemInformed).getVal(`${item}.C.chip_valume`, 0),
              P: _(this.groupItemTypeItemInformed).getVal(`${item}.P.chip_valume`, 0)
            })
          }
          return result
        }, [])
      }
    },
    accumulationChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(this.allItems, (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            result.push({
              item,
              C: _(this.groupItemTypeItemInformed).getVal(`${item}.C.chip_valume`, 0)
                + _(this.groupItemTypeAccumulation).getVal(`${item}.C.total_chip`, 0),
              P: _(this.groupItemTypeItemInformed).getVal(`${item}.P.chip_valume`, 0)
                + _(this.groupItemTypeAccumulation).getVal(`${item}.P.total_chip`, 0)
            })
          }
          return result
        }, [])
      }
    }
  },
  created()
  {
    this.currentTimer = setInterval(() =>
    {
      this.currentTime = moment().getDateTime()
    }, 1000)
  },
  destroyed()
  {
    clearInterval(this.currentTimer)
  }
}