<template>
  <section>
    <ve-line
        :data="chipChartData"
        :after-config="optionConfig"
        :colors="colors"
        height="350px"></ve-line>
  </section>
</template>

<script>
  import ChipMixins from 'mixins/chip'

  export default {
    api: 'getOptionChip',
    mixins: [ChipMixins],
    computed: {
      chipChartData()
      {
        return {
          columns: ['時間', '總Ｃ', '總Ｐ', 'ＣＰ差額'],
          rows: _.reduce(this.datas, (result, val) =>
          {
            result.push({
              '時間': val.created_at,
              '總Ｃ': val.total_c,
              '總Ｐ': val.total_p,
              'ＣＰ差額': val.differ_cp
            })
            return result
          }, [])
        }
      }
    }
  }
</script>
