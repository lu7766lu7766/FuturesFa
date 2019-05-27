import ReqMixins from 'mixins/request'
import OptionType from 'Constants/OptionType'

export default {
  mixins: [ReqMixins],
  data: () => ({
    type: '',
    itemInformedDatas: [],
    chipAccumulationDatas: []
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
    todayConfig(options)
    {
      return this.getConfig(options, '當日籌碼', this.theDate)
    },
    accumulationConifg(options)
    {
      return this.getConfig(options, '累計籌碼')
    },
    getConfig(options, title, subTitle)
    {
      options.title = {
        text: title,
        subtext: subTitle //'二级标题'
      }
      options.legend = { //圖例
        data: [''] // 柱狀顏色提示 series name相map
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
    isWeekItem()
    {
      return this.optionType === OptionType.WEEK
    },
    itemInformed()
    {
      return _.filter(this.itemInformedDatas, x =>
      {
        return this.isWeekItem
          ? x.name.indexOf(OptionType.WEEK_KEY_WORD) > -1
          : x.name.indexOf(OptionType.WEEK_KEY_WORD) === -1
      })
    },
    CItemInformed()
    {
      return _.filter(this.itemInformed, x => x.name.indexOf('C') > -1)
    },
    PItemInformed()
    {
      return _.filter(this.itemInformed, x => x.name.indexOf('P') > -1)
    },
    groupCItemInformed()
    {
      return _.groupBy(this.CItemInformed, 'item')
    },
    groupPItemInformed()
    {
      return _.groupBy(this.PItemInformed, 'item')
    },
    informedChartData()
    {
      return {

        columns: ['item', 'C', 'P'],
        rows: _.reduce(_.keys(this.groupCItemInformed), (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            result.push({
              item,
              C: _(this.groupCItemInformed).getVal(`${item}.0.chip_valume`, 0),
              P: _(this.groupPItemInformed).getVal(`${item}.0.chip_valume`, 0)
            })
          }
          return result
        }, [])
      }
    },
    // -----------------------
    chipAccumulation()
    {
      return _.filter(this.chipAccumulationDatas, x =>
      {
        return this.isWeekItem
          ? x.name.indexOf(OptionType.WEEK_KEY_WORD) > -1
          : x.name.indexOf(OptionType.WEEK_KEY_WORD) === -1
      })
    },
    CChipAccumulation()
    {
      return _.filter(this.chipAccumulation, x => x.name.indexOf('C') > -1)
    },
    PChipAccumulation()
    {
      return _.filter(this.chipAccumulation, x => x.name.indexOf('P') > -1)
    },
    groupCChipAccumulation()
    {
      return _.groupBy(this.CChipAccumulation, 'item')
    },
    groupPChipAccumulation()
    {
      return _.groupBy(this.PChipAccumulation, 'item')
    },
    chipAccumulationChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(_.keys(this.groupCItemInformed), (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            result.push({
              item,
              C: _(this.groupCChipAccumulation).getVal(`${item}.0.total_chip`, 0)
                + _(this.groupCItemInformed).getVal(`${item}.0.chip_valume`, 0),
              P: _(this.groupPChipAccumulation).getVal(`${item}.0.total_chip`, 0)
                + _(this.groupPItemInformed).getVal(`${item}.0.chip_valume`, 0)
            })
          }
          return result
        }, [])
      }
    }
  }
}