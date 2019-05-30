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

  async getOptionChip()
  {
    return await this.request('option-chip')
  }

  async getFuturesChip()
  {
    return await this.request('futures-chip')
  }
}