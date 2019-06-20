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
      <ve-line :data="priceDatas" :colors="['#f00', '#150a98']" :after-config="getConfig"></ve-line>
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
      getConfig(config)
      {
        config.series[0].smooth = true
        let afterSecs = moment().diff(moment().format('YYYY-MM-DD 15:00:00'), 'seconds')
        afterSecs = afterSecs > 0
          ? afterSecs
          : moment().diff(moment().subtract(1, 'days').format('YYYY-MM-DD 15:00:00'), 'seconds')
        const smoothLevel = Math.floor(Math.ceil(afterSecs / 500))
        // console.log(smoothLevel)
        const len = config.series[0].data.length - 1
        if (len > 0)
        {
          for (let index = len; index >= 0; index--)
          {
            if (Math.abs(index - len) % smoothLevel !== 0)
            {
              config.series[0].data.splice(index, 1)
            }
          }
        }
        return config
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
      biggestMustVolume()
      {
        return Math.abs(this.mustVolume.max_volume) > Math.abs(this.mustVolume.min_volume)
          ? Math.abs(this.mustVolume.max_volume)
          : Math.abs(this.mustVolume.min_volume)
      },
      volumePriceDatas()
      {
        return _.reduce(_.cloneDeep(this.datas), (result, data) =>
        {
          data.mainCost = data.price * Math.abs(data.chip_valume) / this.biggestMustVolume
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
