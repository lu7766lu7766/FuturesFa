<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      現在時間：{{ currentTime }} &nbsp;&nbsp;
      資料時間：{{ updateTime }}
    </div>
    <!-- 當日籌碼 -->
    <div class="col-md-7 col-xs-12">
      <ve-histogram
          :data="InformedChartData"
          :after-config="getTodayConfig"
          :height="height"></ve-histogram>
    </div>
    <div class="col-md-5 col-xs-12">
      <futures-chip :height="height" />
    </div>
    <!-- 累計籌碼 -->
    <div class="col-md-7 col-xs-12">
      <ve-histogram
          :data="ChipAccumulationChartData"
          :after-config="getAccumulationConifg"
          :height="height"></ve-histogram>
    </div>
    <div class="col-md-5 col-xs-12">
      <option-chip :height="height" />
    </div>
    <table class="table table-striped txo rwd-table">
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
        <td data-th="加權">
          <span :class="getClassByValue(txo.taiex)">{{ txo.taiex }}</span>
        </td>
        <td data-th="漲跌">
          <span :class="getClassByValue(txo.taiex_updown)">{{ txo.taiex_updown }}</span>
        </td>
        <td data-th="漲跌幅">
          <span :class="getClassByValue(txo.taiex_updown_range)">{{ txo.taiex_updown_range }}</span>
        </td>
        <td data-th="台指">
          <span :class="getClassByValue(txo.mtx)">{{ txo.mtx }}</span>
        </td>
        <td data-th="漲跌">
          <span :class="getClassByValue(txo.mtx_updown)">{{ txo.mtx_updown }}</span>
        </td>
        <td data-th="漲跌幅">
          <span :class="getClassByValue(txo.mtx_updown_range)">{{ txo.mtx_updown_range }}</span>
        </td>
        <td data-th="大戶(夜)">
          <span :class="getClassByValue(txo.major)">{{ txo.major }}</span>
        </td>
        <td data-th="散戶(夜)">
          <span :class="getClassByValue(txo.retail)">{{ txo.retail }}</span>
        </td>
        <td data-th="筆差">
          <span :class="getClassByValue(txo.differ)">{{ txo.differ }}</span>
        </td>
        <td data-th="總Ｃ">
          <span :class="getClassByValue(txo.total_c)">{{ txo.total_c }}</span>
        </td>
        <td data-th="總Ｐ">
          <span :class="getClassByValue(txo.total_p, '')">{{ txo.total_p }}</span>
        </td>
        <td data-th="ＣＰ差額">
          <span :class="getClassByValue(txo.differ_cp)">{{ txo.differ_cp }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import OptionMixins from 'mixins/option'
  import CSSMixins from 'mixins/css'

  export default {
    mixins: [OptionMixins, CSSMixins],
    components: {
      FuturesChip: () => import('@/FuturesChip'),
      OptionChip: () => import('@/OptionChip')
    },
    data: () => ({
      isWeekItem: true,
      timer: null,
      timer2: null,
      txo: {},
      height: '325px'
    }),
    methods: {
      async getTXO()
      {
        const res = await this.$api.data.getTXO({
          key: 'TXO'
        })
        this.txo = res.data
      },
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
          this.getTXO()
        }, getenv('optionUpdateSecs', 30) * 1000)
        this.timer2 = setInterval(() =>
        {
          this.getChipAccumulation()
        }, getenv('accumulationUpdateSecs', 30) * 1000)
      }
    },
    computed: {
      centerPoint()
      {
        return Math.floor(this.txo.mtx / 100) * 100
      },
      showChipList()
      {
        let mustNeerItem = 0, neerIndex = 0
        this.allItems.forEach((item, index) =>
        {
          if (Math.abs(this.centerPoint - item) < Math.abs(this.centerPoint - mustNeerItem))
          {
            mustNeerItem = item
            neerIndex = index
          }
        })
        const startIndex = (neerIndex - 5) < 0
          ? 0
          : neerIndex - 5

        // 前5後5所以11
        return _.cloneDeep(this.allItems).splice(startIndex, 11)
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

</style>