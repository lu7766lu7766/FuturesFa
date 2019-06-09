import OptionCommonMixins from 'mixins/option/common'

export default {
  mixins: [OptionCommonMixins],
  computed: {

    CGroupWeekItemInformed()
    {
      return this.getGroupItemInformed('C', true)
    },
    PGroupWeekItemInformed()
    {
      return this.getGroupItemInformed('P', true)
    },
    // 所有的item
    allWeekItems()
    {
      return _.keys(this.CGroupWeekItemInformed)
    },
    CGroupWeekChipAccumulation()
    {
      return this.getGroupChipAccumulation('C', true)
    },
    PGroupWeekChipAccumulation()
    {
      return this.getGroupChipAccumulation('P', true)
    },
    /**
     * 整理成繪製需要的資料
     */
    WeekInformedChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(this.allWeekItems, (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            // 新倉跟舊倉可能同時存在資料，所以取前者
            result.push({
              item,
              // C: _.getVal(_.last(this.CGroupItemInformed[item]), 'chip_valume', 0),
              // P: _.getVal(_.last(this.PGroupItemInformed[item]), 'chip_valume', 0)
              C: _(this.CGroupWeekItemInformed).getVal(`${item}.0.chip_valume`, 0),
              P: _(this.PGroupWeekItemInformed).getVal(`${item}.0.chip_valume`, 0)
            })
          }
          return result
        }, [])
      }
    },
    /**
     * 整理成繪製需要的資料
     */
    WeekChipAccumulationChartData()
    {
      return {
        columns: ['item', 'C', 'P'],
        rows: _.reduce(this.allWeekItems, (result, item) =>
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
              C: _(this.CGroupWeekItemInformed).getVal(`${item}.0.chip_valume`, 0) +
                _(this.CGroupWeekChipAccumulation).getVal(`${item}.0.total_chip`, 0),
              P: _(this.PGroupWeekItemInformed).getVal(`${item}.0.chip_valume`, 0) +
                _(this.PGroupWeekChipAccumulation).getVal(`${item}.0.total_chip`, 0)
            })
          }
          return result
        }, [])
      }
    }
  }
}