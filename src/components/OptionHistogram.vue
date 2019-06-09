<template>
  <ve-histogram
      :data="data"
      :after-config="config"
      :height="height ? height : '400px'"></ve-histogram>
</template>

<script>
  export default {
    props: ['data', 'config', 'height']
  }
</script>
