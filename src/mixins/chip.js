import ReqMixins from 'mixins/request'
import env from 'src/../env'

export default {
  mixins: [ReqMixins],
  data: () => ({
    theDate: '',
    timer: null,
    datas: [],
    colors: ['#f00', '#0f0', '#9c7548']
  }),
  methods: {
    futuresConfig(options)
    {
      return this.getConfig(options, '主散VS筆差')
    },
    optionConfig(options)
    {
      return this.getConfig(options, 'CP差額')
    },
    getConfig(options, title)
    {
      options.title = {
        text: title,
        subtext: this.theDate //'二级标题'
      }
      options.legend = { //圖例
        data: [''] // 柱狀顏色提示 series name相map
      }

      return options
    },
    async getDatas()
    {
      const res = await this.$api.data[this.$options.api]()
      res.data.forEach(data =>
      {
        this.theDate = !this.theDate
          ? data.created_at.split(' ')[0]
          : this.theDate
        data.created_at = data.created_at.split(' ')[1]
      })
      this.datas = res.data
    },
    startCounter()
    {
      this.timer = setInterval(this.getDatas, env.waitSecs * 1000)
    }
  },
  created()
  {
    this.getDatas()
    this.startCounter()
  },
  destroyed()
  {
    clearInterval(this.timer)
  }
}