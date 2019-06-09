<template>
  <ve-line
      :data="chipChartData"
      :after-config="optionConfig"
      :colors="colors"
      :height="height"></ve-line>
</template>

<script>
  import ChipMixins from 'mixins/chip'

  export default {
    props: ['data', 'height', 'subTitle'],
    mixins: [ChipMixins],
    methods: {
      optionConfig(options)
      {
        return this.getConfig(options, 'CP差額', this.subTitle)
      }
    },
    computed: {
      chipChartData()
      {
        return {
          columns: ['時間', '總Ｃ', '總Ｐ', 'ＣＰ差額'],
          rows: _.reduce(this.data, (result, val) =>
          {
            result.push({
              '時間': val.created_at.split(' ')[1],
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
