import PageMixins from 'mixins/paginate'

export default {
  mixins: [PageMixins],
  methods: {
    async callApi(f) {
      this.$loading()
      try
      {
        await f()
      } catch (e)
      {
        this.$loading.close()
        throw e
      }
      this.$loading.close()
    },
    sMsg() {
      this.$Message.success('success')
    },
    fMsg() {
      this.$Message.error('error')
    },
    doSearch() {
      this.callApi(async () =>
      {
        await axios.all([this.getDatas(), this.getTotal()])
      })
    },
    doRefresh() {
      this.callApi(async () =>
      {
        await this.getDatas()
      })
    },
    doPageChange(page, f) {
      this.paginate.page = page
      this.callApi(f)
    }
  }
}