export default {
  components: {
    Paginate: () => import('@/paginate')
  },
  data: () => ({
    paginate: {
      total: 0,
      page: 1,
      perPage: 20
    }
  }),
  computed: {
    lastPage() {
      return Math.ceil(this.paginate.total / this.paginate.perPage)
    }
  }
}