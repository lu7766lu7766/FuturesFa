import OptionCommonMixins from 'mixins/option/common'

export default {
  mixins: [OptionCommonMixins],
  data: () => ({
    currentTime: moment().getDateTime(),
    currentTimer: null
  }),
  methods: {
    // 當日籌碼資料取得
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
    }
  },
  computed: {
    // 資料的開始日期
    theDate()
    {
      return moment().isBefore(moment().format('YYYY-MM-DD 13:45:10'))
        ? moment().subtract(1, 'days').getDate()
        : moment().getDate()
    },
    // 商品名稱
    theName()
    {
      const data = this.getAnyNewItem(this.isWeekItem)
      return data
        ? this.itemNameFilter(this.getAnyNewItem(this.isWeekItem).name)
        : ''
    },
    // 最新資料的更新日期
    updateTime()
    {
      const data = this.getAnyNewItem(this.isWeekItem)
      return data
        ? moment(data.created_at).getDateTime()
        : ''
    }
  },
  created()
  {
    this.currentTimer = setInterval(() =>
    {
      this.currentTime = moment().getDateTime()
    }, 1000)
  },
  destroy()
  {
    clearInterval(this.currentTimer)
  }
}