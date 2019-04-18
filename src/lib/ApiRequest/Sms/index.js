import BaseRequest from '../BaseRequest'
import _config from './config'

export default class Sms extends BaseRequest
{
  constructor() {
    super()
    this.config = _config
  }

  async send(data, options) {
    return await this.request('send', data, options)
  }
}