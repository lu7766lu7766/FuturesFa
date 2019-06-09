import OptionType from 'src/constants/OptionType'
import ReqMixins from 'mixins/request'

export default {
  mixins: [ReqMixins],
  data: () => ({
    itemInformedDatas: [],
    chipAccumulationDatas: []
  }),
  methods: {
    itemNameFilter(name) {
      return name ? name.split(' ')[0].replace(/[^0-9A-Z]/g, '') : ''
    },
    titleAppend(title, subTitle) {
      return `${title}` + (subTitle ? `(${subTitle})` : '')
    },
    getWeekTodayConfig(options, title = '當日籌碼')
    {
      return this.getConfig(options, this.titleAppend(title, this.itemNameFilter(this.anyWeekItem.name)), this.theDate)
    },
    getWeekAccumulationConifg(options, title = '累計籌碼')
    {
      return this.getConfig(options, this.titleAppend(title, this.itemNameFilter(this.anyWeekItem.name)), this.theDate)
    },
    getMonthTodayConfig(options, title = '當日籌碼')
    {
      return this.getConfig(options, this.titleAppend(title, this.itemNameFilter(this.anyMonthItem.name)), this.theDate)
    },
    getMonthAccumulationConifg(options, title = '累計籌碼')
    {
      return this.getConfig(options, this.titleAppend(title, this.itemNameFilter(this.anyMonthItem.name)), this.theDate)
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
      // return _.last(_.map(this.getGroupItemInformed('C', isWeekItem))[0])
      return _.first(_.map(this.getGroupItemInformed('C', isWeekItem))[0]) || {}
    }
  },
  computed: {
    anyWeekItem() {
      return this.getAnyNewItem(true)
    },
    anyMonthItem() {
      return this.getAnyNewItem(false)
    }
  }
}