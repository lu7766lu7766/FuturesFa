import ReqMixins from 'mixins/request'

export default {
  mixins: [ReqMixins],
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
      this.visible = false
    },
    reqFail() {
      this.fMsg()
    }
  }
}