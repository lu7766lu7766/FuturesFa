import ReqMixins from 'mixins/request'
import env from 'src/../env'

export default {
  mixins: [ReqMixins],
  data: () => ({
    timer: null,
    datas: []
  }),
  methods: {
    getDatas()
    {
      this.callApi(async () =>
      {
        const res = await this.$api.data[this.$options.api]()
        this.datas = res.data
      })
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