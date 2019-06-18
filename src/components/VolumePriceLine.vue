<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">
      <div class="col-md-12 col-xs-12">
        <h5>{{ name }}</h5>
      </div>
    </div>
    <div class="col-md-12 col-xs-12">
      <div class="col-md-6 col-xs-12">現在時間：{{ currentTime }}</div>
      <div class="col-md-6 col-xs-12">資料時間：{{ updateTime }}</div>
    </div>
    <div class="col-md-12 col-xs-12">
      <ve-line :data="priceDatas" :colors="['#f00', '#00CF00']"></ve-line>
    </div>

    <div class="col-md-12 col-xs-12">
      <ve-line :data="volumeDatas" :colors="['#150a98']"></ve-line>
    </div>
  </div>
</template>

<script>
  import CurrentTimeMixins from 'mixins/currentTime'

  export default {
    mixins: [CurrentTimeMixins],
    props: {
      name: {
        type: String
      },
      datas: {
        type: Array,
        required: true
      },
      mustVolume: {
        type: Object,
        required: true
      }
    },
    methods: {
      getHundred(volume)
      {
        volume = '' + volume
        return +(volume.substr(0, 1) + Array(volume.length - 1).fill(0).join(''))
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
        return _.reduce(_.cloneDeep(this.datas), (result, data) =>
        {
          data.mainCost = data.price * Math.abs(data.chip_valume)
            / Math.abs(data.chip_valume > 0
              ? this.mustVolume.max_volume
              : this.mustVolume.min_volume)

          result.push(data)
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
