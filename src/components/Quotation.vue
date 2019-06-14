<template>
  <div class="row">
    <div class="col-xs-12" :class="showTime ? 'col-md-3' : 'col-md-6'">
      <Select v-model="search.isWeekItem">
        <Option v-for="(item, index) in options.isWeekItem" :key="index" :value="item.value">
          {{ item.name }}
        </Option>
      </Select>
    </div>
    <div class="col-md-9 col-xs-12" v-if="showTime">
      <div class="col-md-6 col-xs-12">現在時間：{{ currentTime }}</div>
      <div class="col-md-6 col-xs-12">資料時間：{{ updateTime }}</div>
    </div>
    <table class="table col-md-12 col-xs-12 quotation">
      <thead>
      <tr>
        <td>報價(C)</td>
        <td>履約價</td>
        <td>報價(P)</td>
      </tr>
      </thead>
      <tbody v-if="allItemsOrderByValueDesc.length">
      <tr v-for="(item, index) in allItemsOrderByValueDesc"
          :key="index"
          v-if="showChipList.indexOf(item) > -1">
        <td class="item-c">
          <span v-for="(val, index) in [_.getVal(groupItemTypeItemInformed, `${item}.C.price`, 0)]"
                :key="index"
                :class="getClassByValue(val)">
            {{ val }}
          </span>
        </td>
        <td class="item">{{ item }}</td>
        <td class="item-p">
          <span v-for="(val, index) in [_.getVal(groupItemTypeItemInformed, `${item}.P.price`, 0)]"
                :key="index"
                :class="getClassByValue(val, '')">
            {{ val }}
          </span>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td colspan="3">
          <span class="text-danger">查無資料</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import OptionNewMixins from 'mixins/option/new'
  import CSSMixins from 'mixins/css'

  export default {
    mixins: [OptionNewMixins, CSSMixins],
    props: {
      info: {
        type: Object,
        required: true
      },
      data: {
        type: Array,
        required: true
      },
      showTime: {
        type: Boolean,
        default: true
      },
      centerPoint: {
        type: Number
      },
      showRange: {
        type: Number,
        default: 100
      }
    },
    data: () => ({
      search: {
        isWeekItem: 'true'
      },
      options: {
        isWeekItem: [
          {
            name: '周選',
            value: 'true'
          },
          {
            name: '月選',
            value: 'false'
          }
        ]
      }
    }),
    watch: {
      data()
      {
        this.itemInformedDatas = this.data
      }
    },
    computed: {
      isWeekItem()
      {
        return this.search.isWeekItem === 'true'
      },
      showMonth()
      {
        return this.info.mainMonth
      },
      showWeek()
      {
        return this.isWeekItem
          ? this.info.mainWeek
          : ''
      },
      allItemsOrderByValueDesc()
      {
        return _.orderBy(this.allItems, x => +x, 'desc')
      },
      showChipList()
      {
        return this.getShowChipList(this.allItemsOrderByValueDesc, this.showRange)
      }
    },
    mounted()
    {
      this.itemInformedDatas = this.data
    }
  }
</script>

<style lang="stylus" scoped>
  .quotation tr
    td
      width 33.3%
      text-align center
    .item-c, .item-p
      font-weight 900
      font-size 1.8em
    .item
      font-weight 900
      font-size 1.3em

</style>