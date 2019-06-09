import ReqMixins from 'mixins/request'

export default {
  mixins: [ReqMixins],
  data: () => ({
    colors: ['#f00', '#00CF00', '#9c7548']
  }),
  methods: {
    getConfig(options, title, subTitle)
    {
      options.title = {
        text: title,
        subtext: subTitle //'二级标题'
      }
      options.legend = { //圖例
        // data: [''] // 柱狀顏色提示 series name相map
        bottom: 20
      }
      return options
    }
  }
}