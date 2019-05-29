<template>
  <section>
    <Form :model="data" :label-width="80">
      <Form-item label="帳號*">
        {{ data.user_name }}
      </Form-item>
      <Form-item label="密碼">
        <Input type="password"
               name="password"
               placeholder="不異動請保持空白"
               ref="password"
               v-model="data.password"
               v-validate="'min:6'"></Input>
        <span class="text-danger">{{ errorBags.first('password') }}</span>
      </Form-item>
      <Form-item label="密碼確認">
        <Input type="password"
               name="password_confirm"
               placeholder="不異動請保持空白"
               v-model="data.password_confirm"
               v-validate="'confirmed:password'"></Input>
        <span class="text-danger">{{ errorBags.first('password_confirm') }}</span>
      </Form-item>
      <Form-item label="暱稱*">
        <Input name="nick_name"
               v-model="data.nick_name"
               v-validate="'max:20'"></Input>
        <span class="text-danger">{{ errorBags.first('nick_name') }}</span>
      </Form-item>
    </Form>
    <Button type="success" :disabled="errorBags.any()" @click="doSubmit()">送出</Button>

  </section>
</template>

<script>
  import ReqMixins from 'mixins/request'
  import { UserType } from 'module/user'

  export default {
    mixins: [ReqMixins],
    data: () => ({
      data: _.cloneDeep(User.info)
    }),
    methods: {
      doSubmit()
      {
        this.callApi(async () =>
        {
          this.$api.user.updateMyself(_.pick(this.data, ['id', 'password', 'nick_name']), {
            s: async () =>
            {
              this.sMsg()
              const res = await this.$api.user.getInfo()
              this.$store.commit(UserType.setInfo, res.data)
            }
          })
        })
      }
    },
    created()
    {

    }
  }
</script>
