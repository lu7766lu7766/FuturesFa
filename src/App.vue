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

<style name="rwd-table" lang="stylus">
  .rwd-table
    background #fff
    overflow hidden
    min-width 100%
    th, td
      margin 0.5em 1em
      text-align: left;
    tr:nth-of-type(2n)
      background #eee
    th
      display: none;
    td
      display: block;
      &:before
        content attr(data-th) " : "
        font-weight bold
        font-size 0.7em
        width 6.5em
        display inline-block
    th, td:before
      color: #444;
      font-weight: bold;

  @media (min-width: 480px)
    .rwd-table
      th, td
        display table-cell
        padding 0.25em 0.5em
      //padding 0.4em !important
      td:before
        display none
      th:first-child, td:first-child
        padding-left 0
      th:last-child, td:last-child
        padding-right 0
</style>