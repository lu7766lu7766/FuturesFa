<template>
  <div class="layout">
    <section id="login" class="center-box">
      <form>
        <h2>系統登入</h2>
        <input type="text" v-model="data.user_name" placeholder="帳號" />
        <input type="password" v-model="data.password" placeholder="密碼" />
        <button type="button" @click="doLogin">Log in</button>
      </form>
    </section>
  </div>
</template>

<script>
  import reqMixins from 'mixins/request'
  import { LoginType } from 'module/login'

  export default {
    mixins: [reqMixins],
    data: () => ({
      data: {
        user_name: '',
        password: ''
      }
    }),
    methods: {
      doLogin()
      {
        this.callApi(async () =>
        {
          const res = await this.$api.user.login(this.data)
          this.$store.commit(LoginType.setAccessToken, res.data)
          this.$router.push({name: 'week-item'})
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>

  .layout {
    background: #888;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    min-height 100vh;
    width: 100%;
    height: 100%;
    margin: 0px;
    font-family: 'Work Sans', sans-serif;
  }

  section {
    background-color: rgba(0, 0, 0, 0.72);
    width: 25%;
    min-height: 25%;
    display: flex;
    flex-direction: column;
    /*margin-left:auto;
    margin-right:auto;*/
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 15px;
  }

  h2 {
    font-family: 'Archivo Black', sans-serif;
    color: #e0dada;
    margin-left: auto;
    margin-right: auto;
  }

  .info {
    width: 100%;
    padding: 1em 5px;
    text-align: center;
    min-height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .info.error {
    border: 1px solid #a90e0;
    background-color: #ff3c41;
    color: #a90e0;
  }

  .info p {
    margin: auto;
    padding: 5px;
  }

  .info.good {
    border: 1px solid #416d50;
    background-color: #47cf73;
    color: #416d50;
  }

  input {
    height: 35px;
    padding: 5px 5px;
    margin: 10px 0px;
    background-color: #e0dada;
    border: none;
  }

  button {
    height: 40px;
    padding: 5px 5px;
    margin: 10px 0px;
    font-weight: bold;
    background-color: #be5256;
    border: none;
    color: #e0dada;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #711f1b;
  }

  @-webkit-keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate(10px, 0, 0);
    }
  }

  .shake {
    animation-name: shake;
    animation-duration: 1s;
    /*animation-fill-mode: both;*/
  }

  @media screen and (max-width: 780px) {
    section {
      width: 90%;
    }
  }
</style>