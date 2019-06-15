export default {
  data: () => ({
    currentTimer: null,
    currentTime: ''
  }),
  created()
  {
    this.currentTimer = setInterval(() =>
    {
      this.currentTime = moment().getDateTime()
    }, 1000)
  },
  destroyed()
  {
    clearInterval(this.currentTimer)
  }
}