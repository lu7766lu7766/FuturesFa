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
    async getItemInformed()
    {
      const res = await this.$api.data.getOptionItemInformed()
      this.itemInformedDatas = res.data
    },
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
    getInformedChartData(isWeekItem)
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(_.keys(this.getGroupItemInformed('C', isWeekItem)), (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            let CGroupItem = this.getGroupItemInformed('C', isWeekItem)
            let PGroupItem = this.getGroupItemInformed('P', isWeekItem)
            result.push({
              item,
              C: _(_.last(CGroupItem[item])).getVal('chip_valume', 0),
              P: _(_.last(PGroupItem[item])).getVal('chip_valume', 0)
            })
          }
          return result
        }, [])
      }
    },
    getChipAccumulationChartData(isWeekItem)
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(_.keys(this.getGroupItemInformed('C', isWeekItem)), (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            let CGroupItem = this.getGroupItemInformed('C', isWeekItem)
            let PGroupItem = this.getGroupItemInformed('P', isWeekItem)
            let CGroupAccumulation = this.getGroupChipAccumulation('C', isWeekItem)
            let PGroupAccumulation = this.getGroupChipAccumulation('P', isWeekItem)
            result.push({
              item,
              C: _(_.last(CGroupItem[item])).getVal('chip_valume', 0) +
                (CGroupAccumulation[item]
                  ? _.getVal(_.last(CGroupAccumulation[item]), 'total_chip', 0)
                  : 0),
              P: _(_.last(PGroupItem[item])).getVal('chip_valume', 0) +
                (PGroupAccumulation[item]
                  ? _.getVal(_.last(PGroupAccumulation[item]), 'total_chip', 0)
                  : 0)
            })
          }
          return result
        }, [])
      }
    },
    getAnyNewItem(isWeekItem)
    {
      return _.last(_.map(this.getGroupItemInformed('C', isWeekItem))[0])
    }
  },
  computed: {
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
    theName()
    {
      const data = this.getAnyNewItem(this.isWeekItem)
      return data
        ? this.getAnyNewItem(this.isWeekItem).name.split(' ')[0].replace(/[^0-9A-Z]/g, '')
        : ''
    },
    updateTime()
    {
      const data = this.getAnyNewItem(this.isWeekItem)
      return data
        ? moment(data.created_at).getDateTime()
        : ''
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