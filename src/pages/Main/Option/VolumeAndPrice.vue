<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-xs-12">
      <volume-price-line
          :itemInformedDatas="itemInformedDatas"></volume-price-line>
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
          console.log('request', res)
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
    created()
    {
      this.$bus.emit('watchingItem', this.name)
      this.$bus.on('itemInfoReady', res =>
      {
        this.datas = res
        console.log(typeof res, res)
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
