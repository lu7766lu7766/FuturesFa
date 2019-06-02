export default {
  methods: {
    getClassByValue(value, mode = 'normal')
    {
      if (value >= 0)
      {
        return mode === 'normal'
          ? 't-red'
          : 't-green'
      }
      else
      {
        return mode !== 'normal'
          ? 't-green'
          : 't-red'
      }
    }
  }
}