<template>
  <section>
    <ve-line
        :data="chipChartData"
        :after-config="futuresConfig"
        :colors="colors"></ve-line>
  </section>
</template>

<script>
  import ChipMixins from 'mixins/chip'

  export default {
    api: 'getFuturesChip',
    mixins: [ChipMixins],
    computed: {
      chipChartData()
      {
        return {
          columns: ['時間', '大戶籌碼量', '散戶籌碼量量', '筆差'],
          rows: _.reduce(this.datas, (result, val) =>
          {
            result.push({
              '時間': val.created_at,
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
