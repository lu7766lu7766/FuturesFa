<template>
  <div class="row">
    <div class="col-md-12 col-xs-12">

    </div>

    <div class="col-md-12 col-xs-12">

    </div>
  </div>
</template>

<script>
  import CurrentTimeMixins from 'mixins/currentTime'

  export default {
    mixins: [CurrentTimeMixins],
    props: {
      itemInformedDatas: {
        type: Array,
        required: true
      }
    },
    computed: {
      showMonth()
      {
        return this.$router.params.month
      },
      showWeek()
      {
        return this.$router.params.week
      },
      item() {
        return this.$router.params.item
      },
      type() {
        return this.$router.params.type
      },
      priceDatas() {
        return {
          columns: ['時間', '主力成本', '報價'],
          rows:_.reduce(this.allItems, (result, item) =>
          {

          }, [])
        }
      },
      volumeDatas() {
        return {
          columns: ['時間', '總量'],
          rows:_.reduce(this.allItems, (result, item) =>
          {

          }, [])
        }
      }
    }
  }
</script>
