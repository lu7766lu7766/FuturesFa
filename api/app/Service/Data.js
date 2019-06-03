'use strict'

const dataRepo = App.make('Repositories/Data')
// const redisService = App.make('Service/Redis')
const Redis = use('Redis')

class DataService
{
  async generalizeDatas(ctx)
  {
    let res = true
    const date = ctx
      ? ctx.request.input('date', moment().subtract(1, 'days').getDate())
      : moment().subtract(1, 'days').getDate()
    res = res && await dataRepo.setDate('option', date)
    res = res && await dataRepo.transferOptionData(date)
    res = res && await dataRepo.setDate('futures_chip', date)
    res = res && await dataRepo.transferYesterdayData('futures_chip', 'futures_chip_log', date)
    res = res && await dataRepo.setDate('option_chip', date)
    res = res && await dataRepo.transferYesterdayData('option_chip', 'option_chip_log', date)
    return res
  }

  async getOptionItemInformed()
  {
    return await dataRepo.getOptionItemInformed()
  }

  async getOptionItemInformedByRedis()
  {
    return JSON.parse(await Redis.get('OptionItemInformed'))
  }

  async getOptionChipAccumulation()
  {
    return await dataRepo.getOptionChipAccumulation()
  }

  async getOptionChipAccumulationByRedis()
  {
    return JSON.parse(await Redis.get('OptionChipAccumulation'))
  }

  async getTXO()
  {
    return await dataRepo.getTXO()
  }

  async getTXOByRedis()
  {
    return JSON.parse(await Redis.get('TXO'))
  }

  async getOptionChip()
  {
    return await dataRepo.getOptionChip()
  }

  async getOptionChipByRedis()
  {
    return JSON.parse(await Redis.get('OptionChip'))
  }

  async getFuturesChip()
  {
    return await dataRepo.getFuturesChip()
  }

  async getFuturesChipByRedis()
  {
    return JSON.parse(await Redis.get('FuturesChip'))
  }

  async setAllOptionData()
  {
    this.setOftenData()
    this.setOccasionallyData()
  }

  async setOftenData()
  {
    Redis.set('OptionItemInformed', JSON.stringify(await this.getOptionItemInformed()))
    Redis.set('TXO', JSON.stringify(await this.getTXO()))
    Redis.set('OptionChip', JSON.stringify(await this.getOptionChip()))
    Redis.set('FuturesChip', JSON.stringify(await this.getFuturesChip()))
  }

  async setOccasionallyData()
  {
    Redis.set('OptionChipAccumulation', JSON.stringify(await this.getOptionChipAccumulation()))
  }
  /////// history

  async getOptionHostory(date)
  {
    return await dataRepo.getOptionHostory(date)
  }


  async getOptionChipHistory(date)
  {
    return await dataRepo.getOptionChipHistory(date)
  }

  async getFuturesChipHistory(date)
  {
    return await dataRepo.getFuturesChipHistory(date)
  }
}

module.exports = DataService
