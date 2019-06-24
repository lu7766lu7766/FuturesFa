<template>
  <div class="row">
    <div class="col-md-5 offset-md-4 col-xs-12">
      <quotation
          :itemInformedDatas="itemInformedDatas"
          :info="info"></quotation>
    </div>
  </div>
</template>

<script>
  import OptionInitMixins from 'mixins/option/init'

  export default {
    mixins: [OptionInitMixins],
    components: {
      Quotation: () => import('@/QuotationTable')
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
          this.getDataInfo()
        }, getenv('optionUpdateSecs', 30) * 1000)
      }
    },
    created()
    {
      this.callApi(async () =>
      {
        this.getDataInfo()
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
