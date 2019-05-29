<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      現在時間：{{ currentTime }} &nbsp;&nbsp;
      資料時間：{{ updateTime }}
    </div>
    <!-- 當日籌碼 -->
    <div class="col-md-7 col-xs-12">
      <ve-histogram
          :data="informedChartData"
          :after-config="todayConfig"
          :height="height"></ve-histogram>
    </div>
    <div class="col-md-5 col-xs-12">
      <futures-chip :height="height" />
    </div>
    <!-- 累計籌碼 -->
    <div class="col-md-7 col-xs-12">
      <ve-histogram
          :data="chipAccumulationChartData"
          :after-config="accumulationConifg"
          :height="height"></ve-histogram>
    </div>
    <div class="col-md-5 col-xs-12">
      <option-chip :height="height" />
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
        <td>
          <span :class="txo.major > 0 ? 't-red' : 't-green'">{{ txo.major }}</span>
        </td>
        <td>
          <span :class="txo.retail > 0 ? 't-red' : 't-green'">{{ txo.retail }}</span>
        </td>
        <td>
          <span :class="txo.differ > 0 ? 't-red' : 't-green'">{{ txo.differ }}</span>
        </td>
        <td>
          <span :class="txo.total_c > 0 ? 't-red' : 't-green'">{{ txo.total_c }}</span>
        </td>
        <td>
          <span :class="txo.total_p > 0 ? 't-red' : 't-green'">{{ txo.total_p }}</span>
        </td>
        <td>
          <span :class="txo.differ_cp > 0 ? 't-red' : 't-green'">{{ txo.differ_cp }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import OptionMixins from 'mixins/option'
  import OptionType from 'Constants/OptionType'

  export default {
    mixins: [OptionMixins],
    components: {
      FuturesChip: () => import('@/FuturesChip'),
      OptionChip: () => import('@/OptionChip')
    },
    data: () => ({
      optionType: OptionType.WEEK,
      timer: null,
      timer2: null,
      txo: {},
      height: '325px'
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
        }, getenv('waitSecs', 30) * 1000)
        this.timer2 = setInterval(() =>
        {
          this.getChipAccumulation()
        }, 60 * 60 * 1000)
      }
    },
    computed: {
      centerPoint()
      {
        return Math.floor(this.txo.mtx / 100) * 100
      },
      showChipList()
      {
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
    async mounted()
    {
      await axios.all([
        this.getTXO(),
        this.getItemInformed(),
        this.getChipAccumulation()
      ])
      this.startCounter()
      // this.height = Math.floor(($('.layout-content').height() - $('.txo').height()) / 2) + 'px'
    },
    destroyed()
    {
      clearInterval(this.timer)
      clearInterval(this.timer2)
    }
  }
</script>

<style lang="stylus" scoped>
  .txo
    font-weight 900
    thead
      font-size 1.1em
    tbody
      font-size 2.0em

  .t-red
    color #ff0000

  .t-green
    color #00CF00

</style>