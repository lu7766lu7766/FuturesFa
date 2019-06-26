<template>
  <div class="layout">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">{{ User.nickName }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="後台管理">

            <b-dropdown-item :to="{ name: 'account-manage'}">
              帳號管理
            </b-dropdown-item>
            <b-dropdown-item
                v-if="User.isAdmin"
                :to="{ name: 'user-manage'}">
              使用者管理
            </b-dropdown-item>
            <b-dropdown-item
                v-if="User.isAdmin"
                :to="{ name: 'sys-manage'}">
              系統管理
            </b-dropdown-item>
            <b-dropdown-item @click="doLogout">
              登出
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'week-item' }">
            周選
          </b-nav-item>
          <b-nav-item :to="{ name: 'month-item' }">
            月選
          </b-nav-item>
          <b-nav-item :to="{ name: 'quotation' }">
            報價
          </b-nav-item>
          <b-nav-item :to="{ name: 'history-analysis' }">
            歷史分析
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="User.isAdmin">
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>在線人數：{{ _.keys($store.state.User.online).length }}</em></template>
            <b-dropdown-item href="#" v-for="(user, account) in $store.state.User.online" :key="account">
              {{ account }}({{ user.nick_name }})
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>

          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

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
  import { LoginType } from 'module/login'
  import { apiHost } from 'lib/myLib'

  export default {
    data: () => ({
      ws: null,
      dataCollect: null
    }),
    methods: {
      doLogout()
      {
        this.$store.commit(LoginType.clearAccessToken)
        this.$router.push({
          name: 'login'
        })
      },
      wsConnect()
      {
        this.ws = adonis.Ws(`ws://${apiHost}`).withJwtToken(this.$store.state.Login.token).connect()
        this.ws.on('open', () =>
        {
          this.wsListening()
        })
        this.ws.on('error', () =>
        {
          // console.log('dataCollect error')
        })
        this.ws.on('close', () =>
        {
          // console.log('dataCollect close')
        })
      },
      wsListening()
      {
        this.dataCollect = this.ws.subscribe('DataCollect')
        this.dataCollect.on('ready', () =>
        {
          this.dataCollect.emit('join', User.info)
        })

        this.dataCollect.on('getOnlineMembers', (members) =>
        {
          this.$store.commit(UserType.setOnline, members)
        })

        this.dataCollect.on('itemInfoReady', res =>
        {
          this.$bus.emit('itemInfoReady', res)
        })

        // bus event
        this.$bus.on('watchingItem', name =>
        {
          this.dataCollect.emit('watchingItem', name)
        })
      },
      getOnlineMembers()
      {
        this.dataCollect.emit('getOnlineMembers')
      }
    },
    async created()
    {
      this.wsConnect()
      const res = await this.$api.user.getInfo()
      this.$store.commit(UserType.setInfo, res.data)
      User.isAdmin && setInterval(() =>
      {
        this.getOnlineMembers()
      }, 10 * 1000)
    },
    destroyed()
    {
      this.$bus.off('watchingItem')
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

  /*.nav-item i {*/
  /*float: left;*/
  /*}*/

  /*.nav-item a {*/
  /*float: left;*/
  /*}*/
</style>