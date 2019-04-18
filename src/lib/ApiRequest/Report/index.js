import BaseRequest from '../BaseRequest'
import _config from './config'

export default class Report extends BaseRequest
{
  constructor() {
    super()
    this.config = _config
  }

  async getBetDetail(data) {
    return await this.request('betDetail', data)
  }

  async getBetTotal(data) {
    return await this.request('betTotal', data)
  }

  async getTransferDetail(data) {
    return await this.request('transferDetail', data)
  }

  async getTransferTotal(data) {
    return await this.request('transferTotal', data)
  }

  async getStoreDetail(data) {
    return await this.request('storeDetail', data)
  }

  async getStoreTotal(data) {
    return await this.request('storeTotal', data)
  }

  async getHistoryLottery(data) {
    return await this.request('historyLottery', data)
  }

  async getHistoryLotteryTotal(data) {
    return await this.request('historyLotteryTotal', data)
  }

  async fetchNumbers(data, options) {
    return await this.request('fetchNumbers', data, options)
  }
}