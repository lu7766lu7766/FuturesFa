<template>
  <ve-line
      :data="chipChartData"
      :after-config="futuresConfig"
      :colors="colors"
      :height="height"></ve-line>
</template>

<script>
  import ChipMixins from 'mixins/chip'

  export default {
    props: ['data', 'height', 'subTitle'],
    mixins: [ChipMixins],
    methods: {
      futuresConfig(options)
      {
        return this.getConfig(options, '主散VS筆差', this.subTitle)
      }
    },
    computed: {
      chipChartData()
      {
        return {
          columns: ['時間', '大戶籌碼量', '散戶籌碼量量', '筆差'],
          rows: _.reduce(this.data, (result, val) =>
          {
            result.push({
              '時間': val.created_at.split(' ')[1],
              '大戶籌碼量': val.major_chip_valume,
              '散戶籌碼量量': val.retail_chip_valume,
              '筆差': val.differ
            })
            return result
          }, [])
        }
      }
    }
  }
</script>
