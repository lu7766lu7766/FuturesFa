<template>
  <Modal
      v-model="show"
      title="新增"
      width="60%">
    <Form :model="data" :label-width="80">
      <Form-item label="帳號">
        <Input v-model="data.user_name"></Input>
      </Form-item>
      <Form-item label="密碼">
        <Input type="password" v-model="data.password"></Input>
      </Form-item>
      <Form-item label="暱稱">
        <Input v-model="data.nick_name"></Input>
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
          this.$api.user.create(_.pick(this.data, ['user_name', 'password', 'nick_name', 'role_id', 'expire_time']), {
            s: this.createSuccess
          })
        })
      }
    },
    mounted()
    {
      this.$bus.on('UserManageAdd.show', () =>
      {
        this.data = {}
        this.show = true
      })
    }
  }
</script>
