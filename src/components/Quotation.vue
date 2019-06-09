<template>
  <div class="row">
    <div class="col-md-3 col-xs-12">
      <Select v-model="search.tmpWeekItem">
        <Option v-for="(item, index) in option.isWeekItem" :key="index" :value="item.value">
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
      <tbody>
      <tr v-for="(item, index) in allItemsOrderByValueDesc" :key="index" v-if="showChipList.indexOf(item) > -1">
        <td class="item-c">
          <span v-for="(val, index) in [_.getVal(currentCGroupItemInformed, `${item}.0.price`, 0)]"
                :key="index"
                :class="getClassByValue(val)">
            {{ val }}
          </span>
        </td>
        <td class="item">{{ item }}</td>
        <td class="item-p">
          <span v-for="(val, index) in [_.getVal(currentPGroupItemInformed, `${item}.0.price`, 0)]"
                :key="index"
                :class="getClassByValue(val, '')">
            {{ val }}
          </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import OptionPageMixins from 'mixins/option/page'
  import OptionWeekMixins from 'mixins/option/week'
  import OptionMonthMixins from 'mixins/option/month'
  import CSSMixins from 'mixins/css'

  export default {
    mixins: [OptionPageMixins, OptionWeekMixins, OptionMonthMixins, CSSMixins],
    props: {
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
        tmpWeekItem: 'true'
      },
      option: {
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
      },
      timer: null
    }),
    methods: {
      startCounter()
      {
        this.timer = setInterval(() =>
        {
          this.getItemInformed()
        }, getenv('optionUpdateSecs', 30) * 1000)
      }
    },
    computed: {
      isWeekItem()
      {
        return this.search.tmpWeekItem === 'true'
      },
      allItemsOrderByValueDesc()
      {
        const allItems = this.isWeekItem
          ? this.allWeekItems
          : this.allMonthItems
        return _.orderBy(_.map(allItems, x => +x), x => x, 'desc')
      },
      currentCGroupItemInformed()
      {
        return this.isWeekItem
          ? this.CGroupWeekItemInformed
          : this.CGroupMonthItemInformed
      },
      currentPGroupItemInformed()
      {
        return this.isWeekItem
          ? this.PGroupWeekItemInformed
          : this.PGroupMonthItemInformed
      },
      showChipList()
      {
        let mustNeerItem = 0, neerIndex = 0
        this.allItemsOrderByValueDesc.forEach((item, index) =>
        {
          if (Math.abs(this.centerPoint - item) < Math.abs(this.centerPoint - mustNeerItem))
          {
            mustNeerItem = item
            neerIndex = index
          }
        })
        const startIndex = (neerIndex - this.showRange) < 0
          ? 0
          : neerIndex - this.showRange

        return _.cloneDeep(this.allItemsOrderByValueDesc).splice(startIndex, this.showRange * 2 + 1)
      }
    },
    created()
    {
      this.callApi(async () =>
      {
        await this.getItemInformed()
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