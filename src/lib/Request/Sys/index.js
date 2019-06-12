import BaseRequest from '../BaseRequest'
import _config from './config'

export default class Sys extends BaseRequest
{
  get baseUrls() { return super.baseUrls.concat('sys') }

  constructor()
  {
    super()
    this.config = _config
  }

  async getVersion()
  {
    return await this.request('version')
  }

  async isMonthEndWeek()
  {
    return await this.request('isMonthEndWeek')
  }

  async updateMonthEndWeek(data)
  {
    return await this.request('updateMonthEndWeek', data)
  }
}