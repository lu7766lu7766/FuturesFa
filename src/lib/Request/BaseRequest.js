import { createApiBody, roopParse } from 'lib/myLib'
import { apiHosts, SuccessCodes, UnLoginCode } from 'src/config/api'
import { LoginType } from 'module/login'
import store from 'src/store'
import errorCode from 'src/config/error'
import router from 'src/router'

var path = require('path')

axios.defaults.baseURL = `http://${apiHosts[getenv('target')]}`
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

  convertMoment2String(res)
  {
    _.forEach(res, (val, key) =>
    {
      if (val && typeof val === 'object' && (moment.isMoment(val) || typeof val.getMonth === 'function')
      )
      {
        res[key] = moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    })
    return res
  }

  async request(key, data = {}, options = {}) {
    if (typeof this.config !== 'object') throw 'please init this apiFetch'
    const conf = this.config[key]
    if (!conf) throw 'not found the config'

    // console.log(createApiBody(conf.method, conf.uri, _.merge(_.pickBy(data), conf.data), conf.header))

    let res
    try
    {
      res = await axios(createApiBody(
        conf.method,
        path.join(...this.baseUrls, conf.uri),
        _.merge(
          _.pickBy(this.convertMoment2String(data), x => x !== '' && !_.isNull(x) && !_.isUndefined(x)), conf.data),
        conf.header))
    } catch (e)
    {
      return this.resultProccess(e, options)
    }

    return this.resultProccess(res, options)
  }

  resultProccess(res, options)
  {
    const successF = options.success || options.s
    const failF = options.fail || options.f

    let errorMessages = []
    _.forEach(res.data.code, code =>
    {
      switch (code)
      {
        case SuccessCodes:
          break
        case UnLoginCode:
          store.commit(LoginType.clearAccessToken)
          router.push({
            name: 'login'
          })
          throw 'Please Login!!'
          // errorMessages.push('Please Login!!')
          // return false
          break
        default:
          errorMessages.push(errorCode[code]
            ? errorCode[code]
            : `system error!! please try again later.\n
               status: ${res.status}, code: ${code}`)
          break
      }
    })
    return errorMessages.length
      ? failF
        ? failF(res.data, errorMessages)
        : this.errorHandle(res.data, errorMessages)
      : successF
        ? successF(roopParse(res.data))
        : roopParse(res.data)
  }

  errorHandle(res, errorMessages)
  {
    const msg = errorMessages.join('\n')
    alert(msg)
    throw {message: msg, ...res}
  }
}
