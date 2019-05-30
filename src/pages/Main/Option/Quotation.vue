<template>
  <section>

    <div class="row">

      <div class="col-md-offset-4 col-md-2 col-xs-12">
        <Select v-model="search.tmpWeekItem">
          <Option v-for="(item, index) in option.isWeekItem" :key="index" :value="item.value">
            {{ item.name }}
          </Option>
        </Select>
      </div>
      <div class="col-md-offset-4 col-md-5 col-xs-12">
        <div class="col-md-6 col-xs-12">現在時間：{{ currentTime }}</div>
        <div class="col-md-6 col-xs-12">資料時間：{{ updateTime }}</div>
      </div>

    </div>
    <div class="row">
      <table class="table col-md-offset-4 col-md-4 col-xs-12 quotation">
        <thead>
        <tr>
          <td>報價(C)</td>
          <td>履約價</td>
          <td>報價(P)</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in allItemsOrderByValueDesc" :key="index">
          <td class="t-red">{{ _.getVal(_.last(CGroupItemInformed[item]), 'price', 0) }}</td>
          <td>{{ item }}</td>
          <td class="t-green">{{ _.getVal(_.last(PGroupItemInformed[item]), 'price', 0) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  import OptionMixins from 'mixins/option'

  export default {
    mixins: [OptionMixins],
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
        }, getenv('waitSecs', 30) * 1000)
      }
    },
    computed: {
      isWeekItem()
      {
        return this.search.tmpWeekItem === 'true'
      },
      allItemsOrderByValueDesc()
      {
        return _.orderBy(_.map(this.allItems, x => +x), x => x, 'desc')
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
    .t-red, .t-green
      font-weight 900
      font-size 1.8em

</style>