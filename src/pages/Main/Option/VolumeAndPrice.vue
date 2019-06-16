<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-xs-12">
      <volume-price-line
          :datas="datas"></volume-price-line>
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
      timer: null,
      timer2: null
    }),
    methods: {
      startCounter()
      {
        this.timer = setInterval(async () =>
        {
          const res = await this.$api.data.getTodayItem({name: this.name})
          this.datas = res.data
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
        this.datas = res
        this.startCounter()
      })
    },
    destroyed()
    {
      clearInterval(this.timer)
      clearInterval(this.timer2)
    }
  }
</script>
