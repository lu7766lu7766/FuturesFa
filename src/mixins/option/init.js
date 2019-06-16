import ReqMixins from 'mixins/request'

export default {
  mixins: [ReqMixins],
  data: () => ({
    itemInformedDatas: [],
    chipAccumulationDatas: [],
    info: {}
  }),
  methods: {
    // 當日籌碼資料取得(最新資訊)
    async getItemInformed()
    {
      const res = await this.$api.data.getOptionItemInformed()
      this.itemInformedDatas = res.data
    },
    // 累計籌碼資料取得
    async getChipAccumulation()
    {
      const res = await this.$api.data.getOptionChipAccumulation()
      this.chipAccumulationDatas = res.data
    },
    // 取得相關資訊
    async getDataInfo(data)
    {
      const res = await this.$api.data.getDataInfo(data)
      this.info = res.data
    }
  }
}