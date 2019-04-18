import ReqMixins from 'mixins/request'

export default {
  mixins: [ReqMixins],
  methods: {
    reqSuccess() {
      this.sMsg()
      this.doSearch()
    },
    reqFail() {
      this.fMsg()
    }
  }
}