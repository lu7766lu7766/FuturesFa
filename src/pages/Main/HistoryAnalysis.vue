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

    <div class="col-md-12"
         :style="{visibility: !!itemInformedDatas.length? '' : 'hidden'}">
      <Divider>週選</Divider>
      <!-- 週選 -->
      <!-- 當日籌碼 -->
      <div class="row">
        <div class="col-md-7 col-xs-12">
          <option-histogram
              v-if="weekShowMonth"
              :itemInformedDatas="itemInformedDatas"
              :info="info"
              :showMonth="weekShowMonth"
              :showWeek="weekShowWeek"
              :range="5"></option-histogram>
        </div>
        <div class="col-md-5 col-xs-12">
          <futures-chip
              :data="futuresChip"
              :subTitle="info.date"
              :height="height" />
        </div>
      </div>

      <!-- 累計籌碼 -->
      <div class="row">
        <div class="col-md-7 col-xs-12">
          <option-histogram
              v-if="weekShowMonth"
              :itemInformedDatas="itemInformedDatas"
              :chipAccumulationDatas="chipAccumulationDatas"
              :info="info"
              :showMonth="weekShowMonth"
              :showWeek="weekShowWeek"
              :range="5"
              :height="height"></option-histogram>
        </div>
        <div class="col-md-5 col-xs-12">
          <option-chip
              :data="optionChip"
              :subTitle="info.date"
              :height="height" />
        </div>
      </div>

      <Divider>月選</Divider>
      <!-- 月選 -->
      <!-- 當日籌碼 -->
      <div class="row">
        <div class="col-md-12 col-xs-12">
          <option-histogram
              v-if="monthShowMonth"
              :itemInformedDatas="itemInformedDatas"
              :info="info"
              :showMonth="monthShowMonth"></option-histogram>
        </div>
      </div>

      <!-- 累計籌碼 -->
      <div class="row">
        <div class="col-md-12 col-xs-12">
          <option-histogram
              v-if="monthShowMonth"
              :itemInformedDatas="itemInformedDatas"
              :chipAccumulationDatas="chipAccumulationDatas"
              :info="info"
              :showMonth="monthShowMonth"></option-histogram>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import OptionInitMixins from 'mixins/option/init'

  export default {
    mixins: [OptionInitMixins],
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
      itemInformedDatas: [],
      chipAccumulationDatas: [],
      futuresChip: [],
      optionChip: []
    }),
    methods: {
      getDatas()
      {
        this.callApi(async () =>
        {
          const reqBody = {dateTime: this.dateTime}
          this.getDataInfo(reqBody)
          const res = await this.$api.data.getHistory(reqBody)
          this.itemInformedDatas = res.data.option
          this.chipAccumulationDatas = res.data.option_accumulation
          this.futuresChip = res.data.futures_chip
          this.optionChip = res.data.option_chip
        })
      }
    },
    computed: {
      dateTime()
      {
        return moment(`${moment(this.search.date).getDate()} ${this.search.time}`).getDateTime()
      },
      weekShowMonth()
      {
        return this.info.mainMonth
      },
      weekShowWeek()
      {
        return this.info.isMonthSettleTime
          ? ''
          : this.info.mainWeek
      },
      monthShowMonth()
      {
        return this.info.subMonth
      }
    }
  }
</script>