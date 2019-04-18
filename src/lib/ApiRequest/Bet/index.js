import BaseRequest from '../BaseRequest'
import _config from './config'

export default class Bet extends BaseRequest
{
  constructor() {
    super()
    this.config = _config
  }

  async getGameTypeOptions() {
    return await this.request('gameTypeOptions')
  }

  async bet(data) {
    return await this.request('bet', data)
  }
}