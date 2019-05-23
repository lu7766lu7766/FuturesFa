<template>
  <section>

  </section>
</template>

<script>
  import OptionMixins from 'mixins/option'
  import OptionType from 'Constants/OptionType'

  export default {
    mixins: [OptionMixins],
    data: () => ({
      type: OptionType.MONTH
    })
  }
</script>