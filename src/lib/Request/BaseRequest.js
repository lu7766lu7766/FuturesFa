import { createApiBody, roopParse } from 'lib/myLib'
import { apiHosts, SuccessCodes, UnLoginCode } from 'src/config/api'
import { LoginType } from 'module/login'
import store from 'src/store'
import errorCode from 'src/config/error'
import env from 'src/../env'

var path = require('path')

axios.defaults.baseURL = `http://${apiHosts[env.target]}`
axios.interceptors.response.use((response) =>
{
  return response
}, function (error)
{
  return Promise.reject(error.response)
})

export default class BaseRequest
{
  get baseUrls() { return ['api'] }

  constructor() { }

  async request(key, data = {}, options = {}) {
    if (typeof this.config !== 'object') throw 'please init this apiFetch'
    const conf = this.config[key]
    if (!conf) throw 'not found the config'

    const successF = options.success || options.s
    const failF = options.fail || options.f

    // console.log(createApiBody(conf.method, conf.uri, _.merge(_.pickBy(data), conf.data), conf.header))

    let res
    try
    {
      res = await axios(createApiBody(conf.method, path.join(...this.baseUrls, conf.uri), _.merge(_.pickBy(data), conf.data), conf.header))
    } catch (e)
    {
      alert('system error!! please try again later')
      throw e
      return
    }

    let errorMessages = []
    _.forEach(res.data.code, code =>
    {
      switch (code)
      {
        case SuccessCodes:
          break
        case UnLoginCode:
          store.commit(LoginType.clearAccessToken)
          break
        default:
          errorMessages.push(errorCode[code]
            ? errorCode[code]
            : 'have error!')
          break
      }
    })
    return errorMessages.length
      ? failF
        ? failF(errorMessages)
        : this.errorHandle(errorMessages)
      : successF
        ? successF(roopParse(res.data))
        : roopParse(res.data)

  }

  errorHandle(errorMessages) {
    const msg = errorMessages.join('\n')
    alert(msg)
    throw msg
  }
}
