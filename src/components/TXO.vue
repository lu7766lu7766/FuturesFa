<template>
  <table class="table table-striped txo rwd-table">
    <thead>
    <tr>
      <th>加權</th>
      <th>漲跌</th>
      <th>漲跌幅</th>
      <th>台指</th>
      <th>漲跌</th>
      <th>漲跌幅</th>
      <th>正逆價差</th>
      <th>大戶(夜)</th>
      <th>散戶(夜)</th>
      <th>筆差</th>
      <th>總Ｃ</th>
      <th>總Ｐ</th>
      <th>ＣＰ差額</th>
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
      <td data-th="正逆價差">
        <span :class="getClassByValue(txo.mtx - txo.taiex)">{{ txo.mtx - txo.taiex }}</span>
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
</template>

<script>
  import CSSMixins from 'mixins/css'

  export default {
    props: ['txo'],
    mixins: [CSSMixins]
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