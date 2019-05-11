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
    },
    getReqBody(body)
    {
      return _.assign(body, this.search, this.paginate)
    }
  }
}