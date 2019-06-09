<template>
  <div class="row">
    <div class="col-md-4 offset-md-4 col-xs-12">
      <quotation :showTime="true"></quotation>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      Quotation: () => import('@/Quotation')
    }
  }
</script>
