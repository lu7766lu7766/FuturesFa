<template>
  <div class="row">
    <!-- 當日籌碼 -->
    <div class="col-md-8 col-xs-12">
      <ve-histogram
          :data="informedChartData"
          :after-config="todayConfig"
          height="350px"></ve-histogram>
    </div>
    <div class="col-md-4 col-xs-12">
      <futures-chip />
    </div>
    <!-- 累計籌碼 -->
    <div class="col-md-8 col-xs-12">
      <ve-histogram
          :data="chipAccumulationChartData"
          :after-config="accumulationConifg"
          height="350px"></ve-histogram>
    </div>
    <div class="col-md-4 col-xs-12">
      <option-chip />
    </div>
    <table class="table table-striped txo">
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
        <td>
          <span :class="txo.taiex > 0 ? 't-red' : 't-green'">{{ txo.taiex }}</span>
        </td>
        <td>
          <span :class="txo.taiex_updown > 0 ? 't-red' : 't-green'">{{ txo.taiex_updown }}</span>
        </td>
        <td>
          <span :class="txo.taiex_updown_range > 0 ? 't-red' : 't-green'">{{ txo.taiex_updown_range }}</span>
        </td>
        <td>
          <span :class="txo.mtx > 0 ? 't-red' : 't-green'">{{ txo.mtx }}</span>
        </td>
        <td>
          <span :class="txo.mtx_updown > 0 ? 't-red' : 't-green'">{{ txo.mtx_updown }}</span>
        </td>
        <td>
          <span :class="txo.mtx_updown_range > 0 ? 't-red' : 't-green'">{{ txo.mtx_updown_range }}</span>
        </td>
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
    components: {
      FuturesChip: () => import('@/FuturesChip'),
      OptionChip: () => import('@/OptionChip')
    },
    data: () => ({
      optionType: OptionType.WEEK,
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
        }, env.waitSecs * 1000)
      }
    },
    computed: {
      centerPoint()
      {
        return Math.floor(this.txo.mtx / 100) * 100
      },
      showChipList()
      {
        const res = []
        const allChips = _.keys(this.groupCItemInformed)
        let mustNeerChip = 0, neerIndex = 0
        allChips.forEach((chip, index) =>
        {
          if (Math.abs(this.centerPoint - chip) < Math.abs(this.centerPoint - mustNeerChip))
          {
            mustNeerChip = chip
            neerIndex = index
          }
        })
        const startIndex = (neerIndex - 5) < 0
          ? 0
          : neerIndex - 5

        // 前5後5所以11
        return _.cloneDeep(allChips).splice(startIndex, 11)
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
  .txo
    font-weight 900
    thead
      font-size 1.1em
    tbody
      font-size 1.4em

  .t-red
    color #ff0000

  .t-green
    color #00ff00
</style>