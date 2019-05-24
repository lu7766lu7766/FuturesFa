<template>
  <div>
    <ve-histogram :data="informedChartData"></ve-histogram>
    <ve-histogram :data="chipAccumulationChartData"></ve-histogram>
    <table class="table table-striped">
      <thead>
      <tr>
        <td>加權</td>
        <td>漲跌</td>
        <td>漲跌幅</td>
        <td>台指</td>
        <td>漲跌</td>
        <td>漲跌幅</td>
        <td>大戶(夜)</td>
        <td>散戶(夜)</td>
        <td>筆差</td>
        <td>總Ｃ</td>
        <td>總Ｐ</td>
        <td>ＣＰ差額</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ txo.taiex }}</td>
        <td>{{ txo.taiex_updown }}</td>
        <td>{{ txo.taiex_updown_range }}</td>
        <td>{{ txo.mtx }}</td>
        <td>{{ txo.mtx_updown }}</td>
        <td>{{ txo.mtx_updown_range }}</td>
        <td>{{ txo.major }}</td>
        <td>{{ txo.retail }}</td>
        <td>{{ txo.differ }}</td>
        <td>{{ txo.total_c }}</td>
        <td>{{ txo.total_p }}</td>
        <td>{{ txo.differ_cp }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import OptionMixins from 'mixins/option'
  import OptionType from 'Constants/OptionType'
  import env from 'src/../env'

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
          this.callApi(async () =>
          {
            await axios.all([
              this.getItemInformed(),
              this.getTXO()
            ])
          })
        }, env.waitSecs * 1000)
      }
    },
    created()
    {
      this.callApi(async () =>
      {
        await axios.all([
          this.getTXO(),
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

<style lang="stylus" scoped>
</style>