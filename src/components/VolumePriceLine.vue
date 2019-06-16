<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      <div class="col-md-6 col-xs-12">現在時間：{{ currentTime }}</div>
      <div class="col-md-6 col-xs-12">資料時間：{{ updateTime }}</div>
    </div>
    <div class="col-md-12 col-xs-12">
      <ve-line :data="priceDatas"></ve-line>
    </div>

    <div class="col-md-12 col-xs-12">
      <ve-line :data="volumeDatas"></ve-line>
    </div>
  </div>
</template>

<script>
  import CurrentTimeMixins from 'mixins/currentTime'

  export default {
    mixins: [CurrentTimeMixins],
    props: {
      datas: {
        type: Array,
        required: true
      }
    },
    methods: {
      mainCostCount(firstItem, secondItem)
      {
        if (firstItem.chip_valume === secondItem.chip_valume)
        {
          return firstItem.price
        }
        else
        {
          return firstItem.price * (secondItem.chip_valume - firstItem.chip_valume)
        }
      }
    },
    computed: {
      length()
      {
        return this.datas.length
      },
      updateTime()
      {
        return this.length
          ? moment(this.datas[0].created_at).getDateTime()
          : ''
      },
      volumePriceDatas()
      {
        let mainCost = 0
        return _.reduce(_.cloneDeep(this.datas), (result, data, index) =>
        {
          if ((index + 1) < this.length)
          {
            mainCost = this.datas[index + 1].chip_valume === this.datas[index].chip_valume
              ? mainCost
              : this.datas[index].price / (this.datas[index + 1].chip_valume - this.datas[index].chip_valume)
          }
          else
          {
            mainCost = this.datas[index].chip_valume === this.datas[index - 1].chip_valume
              ? mainCost
              : this.datas[index].price / (this.datas[index].chip_valume - this.datas[index - 1].chip_valume)
          }
          data.mainCost = mainCost
          result.push({
            ...data
          })
          return result
        }, [])
      },
      priceDatas() {
        return {
          columns: ['時間', '主力成本', '報價'],
          rows: _.reduce(this.volumePriceDatas, (result, data) =>
          {
            result.push({
              '時間': moment(data.created_at).format('HH:mm:ss'),
              '主力成本': data.mainCost,
              '報價': data.price
            })
            return result
          }, [])
        }
      },
      volumeDatas() {
        return {
          columns: ['時間', '總量'],
          rows: _.reduce(this.datas, (result, data) =>
          {
            result.push({
              '時間': moment(data.created_at).format('HH:mm:ss'),
              '總量': data.chip_valume
            })
            return result
          }, [])
        }
      }
    }
  }
</script>
