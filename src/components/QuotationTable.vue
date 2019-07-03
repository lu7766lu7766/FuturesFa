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
        <td>履約價({{ showMonth + showWeek }})</td>
        <td>報價(P)</td>
      </tr>
      </thead>
      <tbody v-if="allItemsOrderByValueDesc.length">
      <tr v-for="(data, item) in quotationDatas"
          :key="item">
        <td class="item-c">
          <router-link :to="{
            name: 'volume-and-price',
            query: {
              name: data.C.name
            }
          }">
            <span :class="getClassByValue(data.C.price)">
            {{ data.C.price }}
            </span>
          </router-link>

        </td>
        <td class="item">{{ item }}</td>
        <td class="item-p">
          <router-link :to="{
            name: 'volume-and-price',
            query: {
              name: data.P.name
            }
          }">
            <span :class="getClassByValue(data.P.price, '')">
              {{ data.P.price }}
            </span>
          </router-link>
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
  import CurrentTimeMixins from 'mixins/currentTime'
  import OptionDataMixins from 'mixins/option/data'
  import CSSMixins from 'mixins/css'

  export default {
    mixins: [CurrentTimeMixins, OptionDataMixins, CSSMixins],
    props: {
      showTime: {
        type: Boolean,
        default: true
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
    computed: {
      isWeekItem()
      {
        return this.search.isWeekItem === 'true'
      },
      showMonth()
      {
        // 顯示邏輯與周選月選頁相同
        return this.isWeekItem
          ? this.info.mainMonth
          : this.info.subMonth
      },
      showWeek()
      {
        return this.info.isMonthSettleTime || !this.isWeekItem
          ? ''
          : this.info.mainWeek
      },
      allItemsOrderByValueDesc()
      {
        return _.orderBy(this.allItems, x => +x, 'desc')
      },
      quotationDatas()
      {
        return _.reduce(this.allItemsOrderByValueDesc, (result, item) =>
        {
          if (!this.showChipList || this.showChipList.indexOf(item) > -1)
          {
            result[item] = this.groupItemTypeItemInformed[item]
          }
          return result
        }, {})
      }
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