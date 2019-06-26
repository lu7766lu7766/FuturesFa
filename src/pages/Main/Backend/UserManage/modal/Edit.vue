<template>
  <Modal
      v-model="show"
      title="編輯"
      width="60%"
      @on-ok="doSubmit">
    <Form :model="data" :label-width="80">
      <Form-item label="帳號">
        {{ data.user_name }}
      </Form-item>
      <Form-item label="密碼">
        <Input type="password"
               name="password"
               placeholder="不異動請空白"
               v-model="data.password"
               v-validate="'min:6'"></Input>
        <span class="text-danger">{{ errorBags.first('password') }}</span>
      </Form-item>
      <Form-item label="暱稱">
        <Input name="nick_name"
               v-model="data.nick_name"
               v-validate="'max:20'"></Input>
        <span class="text-danger">{{ errorBags.first('nick_name') }}</span>
      </Form-item>
      <Form-item label="角色">
        <Select v-model="data.role_id" placeholder="空白則為測試帳號">
          <Option v-for="(role, index) in $parent.option.RoleConstant.option()" :key="index" :value="role.id">
            {{ role.name }}
          </Option>
        </Select>
      </Form-item>
      <Form-item label="過期日">
        <Date-picker type="datetime"
                     placeholder="永久請空白"
                     v-model="data.expire_time"></Date-picker>
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
    methods: {
      doSubmit()
      {
        this.callApi(async () =>
        {
          this.$api.user.update(_.pick(this.data, ['id', 'password', 'nick_name', 'role_id', 'expire_time']), {
            s: this.updateSuccess
          })
        })
      }
    },
    mounted()
    {
      this.$bus.on('UserManageEdit.show', data =>
      {
        data.password = ''
        this.data = _.cloneDeep(data)
        this.show = true
      })
    },
    destroyed()
    {
      this.$bus.off('UserManageEdit.show')
    }
  }
</script>
