<template>
  <div class="row">
    <div class="col-md-5 offset-md-4 col-xs-12">
      <quotation :info=info
                 :data="itemInformedDatas"></quotation>
    </div>
  </div>
</template>

<script>
  import OptionNewMixins from 'mixins/option/new'

  export default {
    mixins: [OptionNewMixins],
    components: {
      Quotation: () => import('@/Quotation')
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
        this.timer2 = setInterval(() =>
        {
          this.getDataInfo()
        }, getenv('accumulationUpdateSecs', 3600) * 1000)
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
      clearInterval(this.timer2)
    }
  }
</script>
