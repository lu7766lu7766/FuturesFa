<template>
  <ve-histogram
      :data="chartData"
      :after-config="!chipAccumulationDatas.length ? getTodayConfig : getAccumulationConifg"
      :height="height"></ve-histogram>
</template>

<script>
  import OptionDataMixins from 'mixins/option/data'

  export default {
    mixins: [OptionDataMixins],
    props: {
      showMonth: {
        type: String,
        required: true
      },
      showWeek: {
        type: Number | String,
        default: ''
      }
    },
    methods: {
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
      }
    }
  }
</script>
