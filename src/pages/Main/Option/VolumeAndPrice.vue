<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-xs-12">
      <volume-price-line
          :name="name"
          :datas="datas"
          :mustVolume="mustVolume"></volume-price-line>
    </div>
  </div>
</template>

<script>
  import OptionInitMixins from 'mixins/option/init'

  export default {
    mixins: [OptionInitMixins],
    components: {
      VolumePriceLine: () => import('@/VolumePriceLine')
    },
    data: () => ({
      datas: [],
      mustVolume: {},
      timer: null
    }),
    methods: {
      async getTodayItem()
      {
        const res = await this.$api.data.getTodayItem({name: this.name})
        this.datas = res.data
      },
      async getTodayItemVolume()
      {
        const res = _.first((await this.$api.data.getTodayItemMustVolume({name: this.name})).data)
        this.mustVolume = res
      },
      startCounter()
      {
        this.timer = setInterval(async () =>
        {
          await axios.all([
            this.getTodayItem(),
            this.getTodayItemVolume()
          ])
        }, getenv('optionUpdateSecs', 30) * 1000)
      }
    },
    computed: {
      name()
      {
        return this.$route.query.name
      }
    },
    mounted()
    {
      let loader = this.$loading.show({
        container: this.$el,
        canCancel: true
      })
      setTimeout(() =>
      {
        this.$bus.emit('watchingItem', this.name)
      }, 200)

      this.$bus.on('itemInfoReady', res =>
      {
        loader.hide()
        this.datas = res.data
        this.mustVolume = _.first(res.mustVolume)
        this.startCounter()
      })
    },
    destroyed()
    {
      this.$bus.off('itemInfoReady')
      clearInterval(this.timer)
    }
  }
</script>
