import BaseRequest from '../BaseRequest'
import _config from './config'

export default class Data extends BaseRequest
{
  get baseUrls() { return super.baseUrls.concat('data') }

  constructor()
  {
    super()
    this.config = _config
  }

  async getOptionTodayItem()
  {
    return await this.request('today-item')
  }

  async getOptionItemInformed()
  {
    return await this.request('item-informed')
  }

  async getOptionChipAccumulation()
  {
    return await this.request('chip-accumulation')
  }

  async getTXO()
  {
    return await this.request('txo')
  }
}