import PageMixins from 'mixins/paginate'

export default {
  mixins: [PageMixins],
  methods: {
    async callApi(f) {
      let loader = this.$loading.show({
        container: this.$el,
        canCancel: true
      })
      try
      {
        await f()
      } catch (e)
      {
        loader.hide()
        throw e
      }
      loader.hide()
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