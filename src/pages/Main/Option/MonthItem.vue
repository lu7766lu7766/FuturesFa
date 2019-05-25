<template>
  <section>
    <ve-histogram
        :data="informedChartData"
        :after-config="todayConfig"></ve-histogram>
    <ve-histogram
        :data="chipAccumulationChartData"
        :after-config="accumulationConifg"></ve-histogram>
  </section>
</template>

<script>
  import OptionMixins from 'mixins/option'
  import OptionType from 'Constants/OptionType'
  import env from 'src/../env'

  export default {
    mixins: [OptionMixins],
    data: () => ({
      optionType: OptionType.MONTH,
      timer: null
    }),
    methods: {
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
        }, env.waitSecs * 1000)
      }
    },
    created()
    {
      this.callApi(async () =>
      {
        await axios.all([
          this.getItemInformed(),
          this.getChipAccumulation()
        ])
        this.startCounter()
      })
    },
    destroyed()
    {
      clearInterval(this.timer)
    }
  }
</script>