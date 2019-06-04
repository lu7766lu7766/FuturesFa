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

<style name="rwd-table">
  .rwd-table {
    background: #fff;
    overflow: hidden;
  }

  .rwd-table tr:nth-of-type(2n) {
    background: #eee;
  }

  .rwd-table th,
  .rwd-table td {
    margin: 0.5em 1em;
  }

  .rwd-table {
    min-width: 100%;
  }

  .rwd-table th {
    display: none;
  }

  .rwd-table td {
    display: block;
  }

  .rwd-table td:before {
    content: attr(data-th) " : ";
    font-weight: bold;
    font-size: 0.7em;
    width: 6.5em;
    display: inline-block;
  }

  .rwd-table th, .rwd-table td {
    text-align: left;
  }

  .rwd-table th, .rwd-table td:before {
    color: #444;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    .rwd-table thead {
      display: none;
    }
  }

  @media (min-width: 480px) {

    .rwd-table td:before {
      display: none;
    }

    .rwd-table th, .rwd-table td {
      display: table-cell;
      padding: 0.25em 0.5em;
    }

    .rwd-table th:first-child,
    .rwd-table td:first-child {
      padding-left: 0;
    }

    .rwd-table th:last-child,
    .rwd-table td:last-child {
      padding-right: 0;
    }

    .rwd-table th,
    .rwd-table td {
      padding: 1em !important;
    }
  }
</style>