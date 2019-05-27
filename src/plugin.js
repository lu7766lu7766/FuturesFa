import API from 'lib/API'

import User from 'Model/User'

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

// 增加moment getDateTime方法
moment.fn.getDateTime = function ()
{
  return this.format('YYYY-MM-DD HH:mm:ss')
}
// 增加moment getDate方法
moment.fn.getDate = function ()
{
  return this.format('YYYY-MM-DD')
}

export default {
  install: function (Vue, options)
  {
    Vue.prototype._ = _
    Vue.prototype.moment = moment
    Vue.prototype.$api = new API()
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

import env from 'src/../env'

global.getenv = (key, defaultVal) =>
{
  return env[key] || defaultVal
}