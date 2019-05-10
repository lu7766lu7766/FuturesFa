import ReqMixins from 'mixins/request'

export default {
  mixins: [ReqMixins],
  data: () => ({
    show: false,
    data: {}
  }),
  methods: {
    createSuccess() {
      this.reqSuccess()
      this.$parent.doSearch()
    },
    updateSuccess() {
      this.reqSuccess()
      this.$parent.doRefresh()
    },
    reqSuccess() {
      this.sMsg()
      this.show = false
    },
    reqFail() {
      this.fMsg()
    }
  }
}