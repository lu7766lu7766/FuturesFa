<template>
  <section>
    <div class="row">
      <div class="col-md-6">

      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <Button type="success" @click="doSubmit()">送出</Button>
      </div>
    </div>

  </section>
</template>

<script>
  import ReqMixins from 'mixins/request'
  import { UserType } from 'module/user'

  export default {
    mixins: [ReqMixins],
    data: () => ({
      data: false
    }),
    methods: {
      doSubmit()
      {
        
      }
    },
    created()
    {

    }
  }
</script>
