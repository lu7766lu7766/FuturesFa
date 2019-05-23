import ListMixins from 'mixins/list'

export default {
  mixins: [ListMixins],
  data: () => ({
    type: '',
    itemInformedDatas: [],
    chipAccumulationDatas: []
  }),
  methods: {
    async getItemInformed()
    {
      const res = await this.$api.data.getOptionItemInformed()
      this.itemInformedDatas = res.data
    },
    async getChipAccumulation()
    {
      const res = await this.$api.data.getOptionChipAccumulation()
      this.chipAccumulationDatas = res.data
    }
  },
  computed: {
    itemInformed()
    {
      return _.filter(this.itemInformed, x => x.name.indexOf(this.type) > -1)
    },
    CItemInformed()
    {
      return _.filter(this.itemInformed, x => x.name.indexOf('C') === -1)
    },
    PItemInformed()
    {
      return _.filter(this.itemInformed, x => x.name.indexOf('P') === -1)
    },
    groupCItemInformed()
    {
      return _.groupBy(this.CItemInformed, 'item')
    },
    groupPItemInformed()
    {
      return _.groupBy(this.PItemInformed, 'item')
    },
    // -----------------------
    chipAccumulation()
    {
      return _.filter(this.chipAccumulation, x => x.name.indexOf(this.type) > -1)
    },
    CChipAccumulation()
    {
      return _.filter(this.chipAccumulation, x => x.name.indexOf('C') === -1)
    },
    PChipAccumulation()
    {
      return _.filter(this.chipAccumulation, x => x.name.indexOf('P') === -1)
    },
    groupCChipAccumulation()
    {
      return _.groupBy(this.CChipAccumulation, 'item')
    },
    groupPChipAccumulation()
    {
      return _.groupBy(this.PChipAccumulation, 'item')
    }
  },
  created()
  {
    this.callApi(async () =>
    {
      this.getItemInformed()
      await this.getChipAccumulation()
    })
  }
}