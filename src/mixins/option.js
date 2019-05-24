import ListMixins from 'mixins/list'
import OptionType from 'Constants/OptionType'

export default {
  mixins: [ListMixins],
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
      return _.filter(_.cloneDeep(this.itemInformedDatas), x =>
      {
        return this.isWeekItem
          ? x.name.indexOf(OptionType.KEY_WORD) > -1
          : x.name.indexOf(OptionType.KEY_WORD) === -1
      })
    },
    CItemInformed()
    {
      return _.filter(_.cloneDeep(this.itemInformed), x => x.name.indexOf('C') === -1)
    },
    PItemInformed()
    {
      return _.filter(_.cloneDeep(this.itemInformed), x => x.name.indexOf('P') === -1)
    },
    groupCItemInformed()
    {
      return _.groupBy(_.cloneDeep(this.CItemInformed), 'item')
    },
    groupPItemInformed()
    {
      return _.groupBy(_.cloneDeep(this.PItemInformed), 'item')
    },
    informedChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(_.keys(_.cloneDeep(this.groupCItemInformed)), (result, item) =>
        {
          result.push({
            item,
            C: this.groupCItemInformed[item][0].chip_valume,
            P: this.groupPItemInformed[item][0].chip_valume
          })
          return result
        }, [])
      }
    },
    // -----------------------
    chipAccumulation()
    {
      return _.filter(_.cloneDeep(this.chipAccumulationDatas), x =>
      {
        return this.isWeekItem
          ? x.name.indexOf(OptionType.KEY_WORD) > -1
          : x.name.indexOf(OptionType.KEY_WORD) === -1
      })
    },
    CChipAccumulation()
    {
      return _.filter(_.cloneDeep(this.chipAccumulation), x => x.name.indexOf('C') === -1)
    },
    PChipAccumulation()
    {
      return _.filter(_.cloneDeep(this.chipAccumulation), x => x.name.indexOf('P') === -1)
    },
    groupCChipAccumulation()
    {
      return _.groupBy(_.cloneDeep(this.CChipAccumulation), 'item')
    },
    groupPChipAccumulation()
    {
      return _.groupBy(_.cloneDeep(this.PChipAccumulation), 'item')
    },
    chipAccumulationChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(_.keys(_.cloneDeep(this.groupCItemInformed)), (result, item) =>
        {
          result.push({
            item,
            C: this.groupCChipAccumulation[item][0].total_chip + this.groupCItemInformed[item][0].chip_valume,
            P: this.groupPChipAccumulation[item][0].total_chip + this.groupPItemInformed[item][0].chip_valume
          })
          return result
        }, [])
      }
    }
  }
}