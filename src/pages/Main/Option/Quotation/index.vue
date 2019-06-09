<template>
  <div class="row">
    <div class="col-md-4 offset-md-4 col-xs-12">
      <quotation :data="itemInformedDatas" :showTime="true"></quotation>
    </div>
  </div>
</template>

<script>
  import OptionPageMixins from 'mixins/option/page'

  export default {
    mixins: [OptionPageMixins],
    components: {
      Quotation: () => import('@/Quotation')
    },
    data: () => ({
      timer: null
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
    }
  }
</script>
