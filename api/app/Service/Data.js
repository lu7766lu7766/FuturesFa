'use strict'

const dataRepo = App.make('Repositories/Data')
const redisService = App.make('Service/Redis')

class DataService
{
  async generalizeDatas({request})
  {
    let res = true
    const date = request.input('date', moment().subtract(1, 'days').getDate())
    res = res && await dataRepo.setDate('option', date)
    res = res && await dataRepo.transferOptionData(date)
    res = res && await dataRepo.setDate('futures_chip', date)
    res = res && await dataRepo.transferYesterdayData('futures_chip', 'futures_chip_log', date)
    res = res && await dataRepo.setDate('option_chip', date)
    res = res && await dataRepo.transferYesterdayData('option_chip', 'option_chip_log', date)
    return res
  }

  async getOptionItemInformed(ctx)
  {
    return await redisService.catch('OptionItemInformed', dataRepo.getOptionItemInformed, ctx)
  }

  async getOptionChipAccumulation(ctx)
  {
    return await redisService.catch('OptionChipAccumulation', dataRepo.getOptionChipAccumulation, ctx)
  }

  async getOptionHostory(date)
  {
    return await dataRepo.getOptionHostory(date)
  }

  async getTXO(ctx)
  {
    return await redisService.catch('TXO', dataRepo.getTXO, ctx)
  }

  async getOptionChip(ctx)
  {
    return await redisService.catch('OptionChip', dataRepo.getOptionChip, ctx)
  }

  async getOptionChipHistory(date)
  {
    return await dataRepo.getOptionChipHistory(date)
  }

  async getFuturesChip(ctx)
  {
    return await redisService.catch('FuturesChip', dataRepo.getFuturesChip, ctx)
  }

  async getFuturesChipHistory(date)
  {
    return await dataRepo.getFuturesChipHistory(date)
  }
}

module.exports = DataService
