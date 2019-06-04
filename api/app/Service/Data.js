'use strict'

const dataRepo = App.make('Repositories/Data')
const redisService = App.make('Service/Redis')

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
    return redisService.get('OptionItemInformed')
  }

  async getOptionChipAccumulation()
  {
    return await dataRepo.getOptionChipAccumulation()
  }

  async getOptionChipAccumulationByRedis()
  {
    return redisService.get('OptionChipAccumulation')
  }

  async getTXO()
  {
    return await dataRepo.getTXO()
  }

  async getTXOByRedis()
  {
    return redisService.get('TXO')
  }

  async getOptionChip()
  {
    return await dataRepo.getOptionChip()
  }

  async getOptionChipByRedis()
  {
    return redisService.get('OptionChip')
  }

  async getFuturesChip()
  {
    return await dataRepo.getFuturesChip()
  }

  async getFuturesChipByRedis()
  {
    return redisService.get('FuturesChip')
  }

  async setAllOptionData()
  {
    this.setOftenData()
    this.setOccasionallyData()
  }

  async setOftenData()
  {
    redisService.set('OptionItemInformed', await this.getOptionItemInformed())
    redisService.set('TXO', await this.getTXO())
    redisService.set('OptionChip', await this.getOptionChip())
    redisService.set('FuturesChip', await this.getFuturesChip())
  }

  async setOccasionallyData()
  {
    redisService.set('OptionChipAccumulation', await this.getOptionChipAccumulation())
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
