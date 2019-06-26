<template>
  <Modal
      v-model="show"
      title="新增帳號"
      width="60%">
    <Form :model="data" :label-width="80">
      <Form-item label="組數">
        <Input v-model="data.count"></Input>
      </Form-item>
      <Form-item label="結果" v-if="datas.length">
        <p>資料請妥善保存</p>
        <Card v-for="(data, index) in datas" :key="index">
          帳號：{{ data.userName }}<br>
          密碼：{{ data.password }}<br>
          過期時間：{{ data.expireTime }}<br>
        </Card>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="doSubmit">確定</Button>
    </div>
  </Modal>

</template>

<script>
  import DetailMixins from 'mixins/detail'

  export default {
    mixins: [DetailMixins],
    data: () => ({
      datas: []
    }),
    methods: {
      doSubmit()
      {
        this.callApi(async () =>
        {
          this.$api.user.createTester(_.pick(this.data, ['count']), {
            s: res =>
            {
              this.datas = res.data
              this.sMsg()
              this.$parent.doSearch()
            }
          })
        })
      }
    },
    mounted()
    {
      this.$bus.on('UserManageAddTester.show', () =>
      {
        this.data = {}
        this.datas = []
        this.show = true
      })
    },
    destroyed()
    {
      this.$bus.off('UserManageAddTester.show')
    }
  }
</script>
