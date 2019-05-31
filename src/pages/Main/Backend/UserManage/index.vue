<template>
  <section>
    <Button type="info" @click="$bus.emit('UserManageAdd.show')">新增</Button>
    <Button type="info" @click="$bus.emit('UserManageAddTester.show')">新增測試帳號</Button>
    <Select v-model="search.role_id" style="width:200px">
      <Option v-for="(role, index) in option.RoleConstant.option()" :key="index" :value="role.id">
        {{ role.name }}
      </Option>
    </Select>
    <Button type="success" @click="doSearch()">送出</Button>
    <br><br>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>帳號</th>
        <th>暱稱</th>
        <th>角色</th>
        <th>過期時間</th>
        <th class="action-field">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data, index) in datas" :key="index">
        <td>{{ data.user_name }}</td>
        <td>{{ data.nick_name }}</td>
        <td>{{ data.role.name }}</td>
        <td>{{ data.expire_time ? data.expire_time : '無' }}</td>
        <td>
          <Button type="warning"
                  v-if="canEdit(data)"
                  @click="$bus.emit('UserManageEdit.show', data)">編輯
          </Button>
          <Button type="error"
                  v-if="canDelete(data)"
                  @click="deleteConfirm(data)">刪除
          </Button>
        </td>
      </tr>
      </tbody>
    </table>
    <paginate :paginate="paginate" @change="pageChange"></paginate>

    <Add />
    <Edit />
    <AddTester />
  </section>
</template>

<script>
  import ListMixins from 'mixins/list'
  import UserModel from 'Model/User'
  import RootConstant from 'ApiConstants/Root'
  import RoleConstant from 'ApiConstants/Role'

  export default {
    mixins: [ListMixins],
    components: {
      Add: require('./modal/Add').default,
      Edit: require('./modal/Edit').default,
      AddTester: require('./modal/AddTester').default
    },
    data: () => ({
      search: {
        role_id: RoleConstant.option()[0].id
      },
      option: {
        RoleConstant
      },
      datas: []
    }),
    methods: {
      async getDatas()
      {
        const res = await this.$api.user.getList(this.getReqBody())
        this.datas = res.data
      },
      async getTotal()
      {
        const res = await this.$api.user.getListTotal(this.getReqBody())
        this.paginate.total = res.data.total
      },
      canEdit(data)
      {
        const user = new UserModel(data)
        if (RootConstant.enum().indexOf(user.userName) > -1)
        {
          return (User.userName === RootConstant.ROOT && user.userName === RootConstant.ROOT) ||
            (User.userName === RootConstant.ANTHOR)
        }
        return true
      },
      canDelete(data)
      {
        const user = new UserModel(data)
        return RootConstant.enum().indexOf(user.userName) === -1
      },
      deleteConfirm(data)
      {
        this.$Modal.confirm({
          title: '警告',
          content: '刪除後無法恢復，確定是否刪除',
          onOk: async () =>
          {
            await this.$api.user.delete({
              id: data.id
            })
            this.sMsg()
            this.doSearch()
          }
        })
      }
    }
  }
</script>
