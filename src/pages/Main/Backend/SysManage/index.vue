<template>
  <section>
    <div class="row">
      <div class="col-md-6">
        <b-form-checkbox
            v-model="data"
            switch
            class="ml-4"
            size="lg">
          是否為月選結算週
        </b-form-checkbox>


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
        this.callApi(async () =>
        {
          await this.$api.sys.updateMonthEndWeek({
            data: this.data
              ? 1
              : 0
          })
          this.sMsg()
        })
      }
    },
    created()
    {
      this.callApi(async () =>
      {
        const res = await this.$api.sys.isMonthEndWeek()
        this.data = res.data
      })
    }
  }
</script>
