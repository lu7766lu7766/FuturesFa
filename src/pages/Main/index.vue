<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1" @on-select="routeTo">
      <div class="layout-logo" style="color:#eee">
        <h5>{{ User.nickName }}</h5>
      </div>
      <div class="layout-nav">
        <Submenu name="1" v-if="User.isAdmin">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            後台管理
          </template>
          <Menu-item name="1-1">使用者管理</Menu-item>
        </Submenu>
        <Menu-item name="2">
          <Icon type="logo-buffer" />
          周選
        </Menu-item>
        <Menu-item name="3">
          <Icon type="ios-book-outline"></Icon>
          月選
        </Menu-item>
      </div>
    </Menu>

    <div class="layout-content">
      <router-view />
    </div>
    <div class="layout-copy">
      2011-2019 &copy; JacWang
    </div>
  </div>

</template>

<script>
  import { UserType } from 'module/user'

  export default {
    data: () => ({
      routeMap: {
        '1-1': 'user-manage',
        '2': 'week-item',
        '3': 'month-item'
      }
    }),
    methods: {
      routeTo(routeName)
      {
        this.$router.push({
          name: this.routeMap[routeName]
        })
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

  .layout {
    border: 1px solid #d7dde4;
    background: #dee0e2;
    min-height: 100vh;
  }

  .layout-logo {
    width: 110px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 700px;
  }

  .layout-content {
    min-height: calc(100vh - 118px);
    margin: 15px 15px 0px 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    padding: 10px;
  }

  .layout-copy {
    /*position: absolute;*/
    text-align: center;
    padding: 10px 0;
    color: #8d96a3;
    width: 100%;
    /*bottom: 0px;*/
  }
</style>