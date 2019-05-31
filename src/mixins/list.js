import ReqMixins from 'mixins/request'

export default {
  mixins: [ReqMixins],
  data: () => ({
    datas: []
  }),
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
    },
    pageChange(page)
    {
      this.paginate.page = page
      this.doRefresh()
    }
  }
}