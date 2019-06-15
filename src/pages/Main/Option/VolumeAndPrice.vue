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
      timer: null,
      timer2: null
    }),
    methods: {
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
        }, getenv('optionUpdateSecs', 30) * 1000)
      }
    },
    created()
    {
      this.callApi(async () =>
      {
        await this.getItemInformed()
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
