import ApiRequest from 'lib/Request'

import User from 'lib/User'

global.User = new User()


_.mixin({
  getVal: function (data, prop, defaultVal = '')
  {
    const res = _.head(_(data).at(prop).value())
    return !_.isUndefined(res)
      ? res
      : defaultVal
  }
}, {
  chain: false
})

export default {
  install: function (Vue, options)
  {
    Vue.prototype._ = _
    Vue.prototype.moment = moment
    Vue.prototype.$api = new ApiRequest()
    Vue.prototype.User = global.User

    Vue.filter('dateTime', function (value)
    {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    })
    Vue.filter('date', function (value)
    {
      return moment(value).format('YYYY-MM-DD')
    })
  }
}