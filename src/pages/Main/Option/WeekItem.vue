<template>
  <section>

  </section>
</template>

<script>
  import OptionMixins from 'mixins/option'
  import OptionType from 'Constants/OptionType'

  export default {
    mixins: [OptionMixins],
    data: () => ({
      type: OptionType.WEEK,
      timer: null,
      txo: {}
    }),
    methods: {
      async getTXO()
      {
        const res = await this.$api.data.getTXO()
        this.txo = res.data
      },
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
          this.getTXO()
        }, 5 * 1000)
      }
    },
    created()
    {
      this.startCounter()
    },
    destroyed()
    {
      clearInterval(this.timer)
    }
  }
</script>