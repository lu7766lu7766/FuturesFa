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
    }
  },
  computed: {
    isWeekItem()
    {
      return this.type === OptionType.WEEK
    },
    itemInformed()
    {
      return _.filter(this.itemInformedDatas, x =>
      {
        return this.isWeekItem
          ? x.name.indexOf(OptionType.KEY_WORD) > -1
          : x.name.indexOf(OptionType.KEY_WORD) === -1
      })
    },
    CItemInformed()
    {
      return _.filter(this.itemInformed, x => x.name.indexOf('C') === -1)
    },
    PItemInformed()
    {
      return _.filter(this.itemInformed, x => x.name.indexOf('P') === -1)
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
          result.push({
            item,
            C: _(this.groupCItemInformed).getVal(`${item}.0.chip_valume`, 0),
            P: _(this.groupPItemInformed).getVal(`${item}.0.chip_valume`, 0)
          })
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
          ? x.name.indexOf(OptionType.KEY_WORD) > -1
          : x.name.indexOf(OptionType.KEY_WORD) === -1
      })
    },
    CChipAccumulation()
    {
      return _.filter(this.chipAccumulation, x => x.name.indexOf('C') === -1)
    },
    PChipAccumulation()
    {
      return _.filter(this.chipAccumulation, x => x.name.indexOf('P') === -1)
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
          result.push({
            item,
            C: _(this.groupCChipAccumulation).getVal(`${item}.0.total_chip`, 0)
              + _(this.groupCItemInformed).getVal(`${item}.0.chip_valume`, 0),
            P: _(this.groupPChipAccumulation).getVal(`${item}.0.total_chip`, 0)
              + _(this.groupPItemInformed).getVal(`${item}.0.chip_valume`, 0)
          })
          return result
        }, [])
      }
    }
  }
}