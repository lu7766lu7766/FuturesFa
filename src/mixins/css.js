export default {
  methods: {
    getClassByValue(value, mode = 'normal')
    {
      if (mode === 'normal')
      {
        return value >= 0
          ? 't-red'
          : 't-green'
      }
      else
      {
        return value >= 0
          ? 't-green'
          : 't-red'
      }
    }
  }
}