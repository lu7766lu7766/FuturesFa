<template>
  <section>

  </section>
</template>

<script>
  import OptionMixins from 'mixins/option'

  export default {
    mixins: [OptionMixins],
    computed: {
      weekItemInformed()
      {
        return _.filter(this.itemInformed, x => x.name.indexOf('W') > -1)
      },
      CItemInformed()
      {
        return _.filter(this.weekItemInformed, x => x.name.indexOf('C') === -1)
      },
      PItemInformed()
      {
        return _.filter(this.weekItemInformed, x => x.name.indexOf('P') === -1)
      },
      groupCItemInformed()
      {
        return _.groupBy(this.CItemInformed, 'item')
      },
      groupPItemInformed()
      {
        return _.groupBy(this.PItemInformed, 'item')
      },
      // -----------------------
      weekChipAccumulation()
      {
        return _.filter(this.chipAccumulation, x => x.name.indexOf('W') > -1)
      },
      CChipAccumulation()
      {
        return _.filter(this.weekChipAccumulation, x => x.name.indexOf('C') === -1)
      },
      PChipAccumulation()
      {
        return _.filter(this.weekChipAccumulation, x => x.name.indexOf('P') === -1)
      },
      groupCChipAccumulation()
      {
        return _.groupBy(this.CChipAccumulation, 'item')
      },
      groupPChipAccumulation()
      {
        return _.groupBy(this.PChipAccumulation, 'item')
      }
    }
  }
</script>