<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      <DatePicker type="date"
                  placeholder="Select date"
                  style="width: 200px"
                  v-model="search.date"></DatePicker>
      <TimePicker type="time"
                  format="HH:mm"
                  placeholder="Select time"
                  style="width: 160px"
                  :steps="[1, 15]"
                  v-model="search.time"></TimePicker>
      <Button type="success" @click="doRefresh()">送出</Button>
    </div>

    <Divider>週選</Divider>
    <!-- 週選 -->
    <!-- 當日籌碼 -->
    <div class="col-md-7 col-xs-12">
      <option-histogram
          :data="WeekInformedChartData"
          :config="getWeekTodayConfig"
          :height="height"></option-histogram>
    </div>
    <div class="col-md-5 col-xs-12">
      <futures-chip
          :data="futuresChip"
          :subTitle="theDate"
          :height="height" />
    </div>
    <!-- 累計籌碼 -->
    <div class="col-md-7 col-xs-12">
      <option-histogram
          :data="WeekChipAccumulationChartData"
          :config="getWeekAccumulationConifg"
          :height="height"></option-histogram>
    </div>
    <div class="col-md-5 col-xs-12">
      <option-chip
          :data="optionChip"
          :subTitle="theDate"
          :height="height" />
    </div>

    <Divider>月選</Divider>

    <!-- 月選 -->
    <!-- 當日籌碼 -->
    <div class="col-md-12 col-xs-12">
      <option-histogram
          :data="MonthInformedChartData"
          :config="getMonthTodayConfig"
          :height="height"></option-histogram>
    </div>
    <!-- 累計籌碼 -->
    <div class="col-md-12 col-xs-12">
      <option-histogram
          :data="MonthChipAccumulationChartData"
          :config="getMonthAccumulationConifg"
          :height="height"></option-histogram>
    </div>

  </div>
</template>

<script>
  import OptionWeekMixins from 'mixins/option/week'
  import OptionMonthMixins from 'mixins/option/month'

  export default {
    mixins: [OptionWeekMixins, OptionMonthMixins],
    components: {
      OptionHistogram: () => import('@/OptionHistogram'),
      FuturesChip: () => import('@/FuturesChip'),
      OptionChip: () => import('@/OptionChip')
    },
    data: () => ({
      search: {
        date: moment().subtract(1, 'days').getDateTime(),
        time: '00:00'
      },
      height: '325px',
      futuresChip: [],
      optionChip: []
    }),
    methods: {
      getDatas()
      {
        this.callApi(async () =>
        {
          const res = await this.$api.data.getHistory({
            dateTime: this.dateTime
          })
          this.itemInformedDatas = res.data.option
          this.chipAccumulationDatas = res.data.option_accumulation
          this.futuresChip = res.data.futures_chip
          this.optionChip = res.data.option_chip
          // this.data = res.data
        })
      }
    },
    computed: {
      dateTime()
      {
        return moment(`${moment(this.search.date).getDate()} ${this.search.time}`).getDateTime()
      },
      theDate()
      {
        return moment(this.dateTime).isBefore(moment(this.dateTime).format('YYYY-MM-DD 14:00:00'))
          ? moment(this.dateTime).subtract(1, 'days').getDate()
          : moment(this.dateTime).getDate()
      }
    }
  }
</script>