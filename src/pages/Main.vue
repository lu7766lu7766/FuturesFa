<template>
  <el-container style="min-height: 100vh; border: 1px solid #eee">

    <el-container>
      <el-header style="text-align: left; font-size: 12px">

        <nav class="navbar navbar-expand-lg navbar-dark primary-color">
          <a class="navbar-brand" href="#">{{ User.nickName }}</a>

          <el-menu default-active="2" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" v-if="User.isAdmin" @click="$router.push({ name: 'manager' })">管理後台</el-menu-item>
            <el-menu-item index="2" @click="$router.push({ name: 'main' })">首頁</el-menu-item>
            <el-menu-item index="3" @click="$router.push({ name: 'history' })">歷史查詢</el-menu-item>
          </el-menu>
        </nav>

      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import { UserType } from 'module/user'

  export default {
    data: () => ({
      isShowMenu: false,
      myClass: 'toggled'
    }),
    methods: {
      test()
      {
        console.log('aa')
      }
    },
    async created()
    {
      const res = await this.$api.user.getInfo()
      this.$store.commit(UserType.setInfo, res.data)
    }
  }
</script>


<style scoped>

  .myAside {

  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>