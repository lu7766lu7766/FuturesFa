<template>
  <section>
    <Button type="info" @click="$bus.emit('UserManageAdd.show')">新增</Button>
    <br><br>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>帳號</th>
        <th>暱稱</th>
        <th>角色</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data, index) in datas" :key="index">
        <td>{{ data.user_name }}</td>
        <td>{{ data.nick_name }}</td>
        <td>{{ data.role.name }}</td>
        <td>
          <Button type="warning"
                  v-if="canEdit(data)"
                  @click="$bus.emit('UserManageEdit.show', data)">編輯
          </Button>
          <Button type="error" style="margin-left:5px"
                  v-if="canDelete(data)">刪除
          </Button>
        </td>
      </tr>
      </tbody>
    </table>
    <paginate :paginate="paginate"></paginate>

    <Add />
    <Edit />
  </section>
</template>

<script>
  import reqMixins from 'mixins/request'
  import UserModel from 'Model/User'
  import RootConstant from 'Constants/Root'
  import RoleConstant from 'Constants/Role'

  export default {
    mixins: [reqMixins],
    components: {
      Add: require('./modal/Add').default,
      Edit: require('./modal/Edit').default
    },
    data: () => ({
      option: {
        RoleConstant
      },
      datas: []
    }),
    methods: {
      async getDatas()
      {
        const res = await this.$api.user.getList(_.pick(this.paginate, ['page', 'perPage']))
        this.datas = res.data
      },
      async getTotal()
      {
        const res = await this.$api.user.getListTotal()
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
      }
    },
    created()
    {
      this.doSearch()
    }
  }
</script>
