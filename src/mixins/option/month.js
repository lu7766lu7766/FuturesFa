import OptionCommonMixins from 'mixins/option/common'

export default {
  mixins: [OptionCommonMixins],
  computed: {
    CGroupMonthItemInformed()
    {
      return this.getGroupItemInformed('C', false)
    },
    PGroupMonthItemInformed()
    {
      return this.getGroupItemInformed('P', false)
    },
    // 所有的item
    allMonthItems()
    {
      return _.keys(this.CGroupMonthItemInformed)
    },
    CGroupMonthChipAccumulation()
    {
      return this.getGroupChipAccumulation('C', false)
    },
    PGroupMonthChipAccumulation()
    {
      return this.getGroupChipAccumulation('P', false)
    },
    /**
     * 整理成繪製需要的資料
     */
    MonthInformedChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(this.allMonthItems, (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            // 新倉跟舊倉可能同時存在資料，所以取前者
            result.push({
              item,
              // C: _.getVal(_.last(this.CGroupItemInformed[item]), 'chip_valume', 0),
              // P: _.getVal(_.last(this.PGroupItemInformed[item]), 'chip_valume', 0)
              C: _(this.CGroupMonthItemInformed).getVal(`${item}.0.chip_valume`, 0),
              P: _(this.PGroupMonthItemInformed).getVal(`${item}.0.chip_valume`, 0)
            })
          }
          return result
        }, [])
      }
    },
    /**
     * 整理成繪製需要的資料
     */
    MonthChipAccumulationChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(this.allMonthItems, (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            // 新倉跟舊倉可能同時存在資料，所以取前者
            result.push({
              item,
              // C: _.getVal(_.last(this.CGroupItemInformed[item]), 'chip_valume', 0) +
              //   (this.CGroupChipAccumulation[item]
              //     ? _.getVal(_.last(this.CGroupChipAccumulation[item]), 'total_chip', 0)
              //     : 0),
              // P: _.getVal(_.last(this.PGroupItemInformed[item]), 'chip_valume', 0) +
              //   (this.PGroupChipAccumulation[item]
              //     ? _.getVal(_.last(this.PGroupChipAccumulation[item]), 'total_chip', 0)
              //     : 0)
              C: _(this.CGroupMonthItemInformed).getVal(`${item}.0.chip_valume`, 0) +
                _(this.CGroupMonthChipAccumulation).getVal(`${item}.0.total_chip`, 0),
              P: _(this.PGroupMonthItemInformed).getVal(`${item}.0.chip_valume`, 0) +
                _(this.PGroupMonthChipAccumulation).getVal(`${item}.0.total_chip`, 0)
            })
          }
          return result
        }, [])
      }
    }
  }
}