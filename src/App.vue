<template>
  <router-view />
</template>

<script>
  export default {
    data: () => ({
      version: 0,
      timer: null
    }),
    methods: {
      async getVersion()
      {
        const res = await this.$api.sys.getVersion()
        this.version = res.data.version
      },
      checkVersion()
      {
        this.$store.commit('checkVersion', this.version)
      }
    },
    async mounted()
    {
      await this.getVersion()
      this.checkVersion()
      this.timer = setInterval(this.checkVersion, 60 * 60 * 1000)
    }
  }
</script>

<style lang="stylus">
  .center-box
    margin auto
    display flex
    justify-content center
    align-items left

  .ivu-btn
    margin 0 5px

  .action-field
    width 300px

  .t-red
    color #ff0000

  .t-green
    color #00CF00
</style>