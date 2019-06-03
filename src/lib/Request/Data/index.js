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

  async getOptionItemInformed(data)
  {
    return await this.request('item-informed', data)
  }

  async getOptionChipAccumulation(data)
  {
    return await this.request('chip-accumulation', data)
  }

  async getTXO(data)
  {
    return await this.request('txo', data)
  }

  async getOptionChip(data)
  {
    return await this.request('option-chip', data)
  }

  async getFuturesChip(data)
  {
    return await this.request('futures-chip', data)
  }
}