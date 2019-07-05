import ReqMixins from 'src/mixins/request'

export default {
  mixins: [ReqMixins],
  props: {
    itemInformedDatas: {
      type: Array,
      required: true
    },
    chipAccumulationDatas: {
      type: Array,
      default: () => []
    },
    info: {
      type: Object,
      required: true
    },
    range: {
      type: Number,
      default: 100
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  watch: {
    updateTime()
    {
      this.$emit('update:updateTime', this.updateTime)
    }
  },
  methods: {
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
        return this.showWeek === ''
          ? data.month == this.showMonth && _.isUndefined(data.week)
          : data.month == this.showMonth && data.week == this.showWeek
      })
    },
    currentAccumulationDatas()
    {
      return _.filter(this.chipAccumulationDatas, data =>
      {
        return this.showWeek === ''
          ? data.month == this.showMonth && _.isUndefined(data.week)
          : data.month == this.showMonth && data.week == this.showWeek
      })
    },
    updateTime()
    {
      return moment(_(this.currentItemInformedDatas).getVal('0.created_at')).getDateTime()
    },
    allItems()
    {
      return _.orderBy(_.keys(_.groupBy(this.currentItemInformedDatas, 'item')), x => +x.item)
    },
    centerPoint()
    {
      const refPoint = !this.showWeek
        ? this.currentItemInformedDatas[0].mtx
        : this.currentItemInformedDatas[0].week_mtx
      // if (!refPoint)
      // {
      //   let mustHigher = 0, mustNeer
      //   this.allItems.forEach(item =>
      //   {
      //     const cValue = Math.abs(this.groupItemTypeItemInformed[item].C.chip_valume)
      //     const pValue = Math.abs(this.groupItemTypeItemInformed[item].P.chip_valume)
      //     if (cValue > mustHigher || pValue > mustHigher)
      //     {
      //       mustNeer = item
      //       mustHigher = cValue > pValue
      //         ? cValue
      //         : pValue
      //     }
      //   })
      //   return mustNeer
      // }
      let mustNeer = 0
      this.allItems.forEach(item =>
      {
        mustNeer = Math.abs(refPoint - item) < Math.abs(refPoint - mustNeer)
          ? item
          : mustNeer
      })
      return mustNeer
    },
    showChipList()
    {
      return this.centerPoint && this.range
        ? this.getShowChipList(this.allItems, this.range)
        : null
    },
    groupItemTypeItemInformed()
    {
      return _.mapValues(_.groupBy(this.currentItemInformedDatas, 'item'), data => _.keyBy(data, 'type'))
    },
    groupItemTypeAccumulation()
    {
      return _.mapValues(_.groupBy(this.currentAccumulationDatas, 'item'), data => _.keyBy(data, 'type'))
    },
    chartData()
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
  }
}