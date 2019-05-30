import ReqMixins from 'mixins/request'
import OptionType from 'Constants/OptionType'

export default {
  mixins: [ReqMixins],
  data: () => ({
    type: '',
    itemInformedDatas: [],
    chipAccumulationDatas: [],
    currentTime: moment().getDateTime(),
    currentTimer: null
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
    getTodayConfig(options)
    {
      return this.getConfig(options, '當日籌碼', this.theDate)
    },
    getAccumulationConifg(options)
    {
      return this.getConfig(options, '累計籌碼')
    },
    // chart的config
    getConfig(options, title, subTitle)
    {
      options.title = {
        text: `${title}(${this.theName})`,
        subtext: subTitle //'二级标题'
      }
      options.legend = { //圖例
        // data: [''] // 柱狀顏色提示 series name相map
        show: false
      }

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
      return options
    },
    getGroupItemInformed(type, isWeekItem)
    {
      return _.groupBy(_.filter(
        _.filter(this.itemInformedDatas, x => isWeekItem
          ? x.name.indexOf(OptionType.WEEK_KEY_WORD) > -1
          : x.name.indexOf(OptionType.WEEK_KEY_WORD) === -1
        ), x => x.name.indexOf(type) > -1), 'item')
    },
    getGroupChipAccumulation(type, isWeekItem)
    {
      return _.groupBy(_.filter(
        _.filter(this.chipAccumulationDatas, x => isWeekItem
          ? x.name.indexOf(OptionType.WEEK_KEY_WORD) > -1
          : x.name.indexOf(OptionType.WEEK_KEY_WORD) === -1
        ), x => x.name.indexOf(type) > -1), 'item')
    },
    getAnyNewItem(isWeekItem)
    {
      return _.last(_.map(this.getGroupItemInformed('C', isWeekItem))[0])
    },
  },
  computed: {
    // 資料的開始日期
    theDate()
    {
      if (moment().isBetween(moment().format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 13:45:00')))
      {
        return moment().subtract(1, 'days').getDate()
      }
      else
      {
        return moment().getDate()
      }
    },
    // 商品名稱
    theName()
    {
      const data = this.getAnyNewItem(this.isWeekItem)
      return data
        ? this.getAnyNewItem(this.isWeekItem).name.split(' ')[0].replace(/[^0-9A-Z]/g, '')
        : ''
    },
    // 最新資料的更新日期
    updateTime()
    {
      const data = this.getAnyNewItem(this.isWeekItem)
      return data
        ? moment(data.created_at).getDateTime()
        : ''
    },
    /**
     * 以下皆以 data.isWeekItem作切換
     * 寫成computed，可以當變數使用，不用持續計算，效能較好
     */
    CGroupItemInformed()
    {
      return this.getGroupItemInformed('C', this.isWeekItem)
    },
    PGroupItemInformed()
    {
      return this.getGroupItemInformed('P', this.isWeekItem)
    },
    // 所有的item
    allItems()
    {
      return _.keys(this.CGroupItemInformed)
    },
    CGroupChipAccumulation()
    {
      return this.getGroupChipAccumulation('C', this.isWeekItem)
    },
    PGroupChipAccumulation()
    {
      return this.getGroupChipAccumulation('P', this.isWeekItem)
    },
    /**
     * 整理成繪製需要的資料
     */
    InformedChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(this.allItems, (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            result.push({
              item,
              C: _.getVal(_.last(this.CGroupItemInformed[item]), 'chip_valume', 0),
              P: _.getVal(_.last(this.PGroupItemInformed[item]), 'chip_valume', 0)
            })
          }
          return result
        }, [])
      }
    },
    /**
     * 整理成繪製需要的資料
     */
    ChipAccumulationChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(this.allItems, (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            result.push({
              item,
              C: _.getVal(_.last(this.CGroupItemInformed[item]), 'chip_valume', 0) +
                (this.CGroupChipAccumulation[item]
                  ? _.getVal(_.last(this.CGroupChipAccumulation[item]), 'total_chip', 0)
                  : 0),
              P: _.getVal(_.last(this.PGroupItemInformed[item]), 'chip_valume', 0) +
                (this.PGroupChipAccumulation[item]
                  ? _.getVal(_.last(this.PGroupChipAccumulation[item]), 'total_chip', 0)
                  : 0)
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
  }
}