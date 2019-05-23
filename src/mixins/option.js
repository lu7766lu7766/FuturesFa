import ListMixins from 'mixins/list'

export default {
  mixins: [ListMixins],
  data: () => ({
    timer: null,
    itemInformed: [],
    chipAccumulation: []
  }),
  methods: {
    async getItemInformed()
    {
      const res = await this.$api.data.getOptionItemInformed()
      this.itemInformed = res.data
    },
    async getChipAccumulation()
    {
      const res = await this.$api.data.getOptionChipAccumulation()
      this.chipAccumulation = res.data
    },
    startCounter()
    {
      this.timer = setInterval(this.getItemInformed, 5 * 1000)
    }
  },
  created()
  {
    this.callApi(async () =>
    {
      this.getItemInformed()
      await this.getChipAccumulation()
      this.startCounter()
    })
  },
  destroyed()
  {
    clearInterval(this.timer)
  }
}