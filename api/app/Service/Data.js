'use strict'

const dataRepo = App.make('Repositories/Data')
const redisService = App.make('Service/Redis')

class DataService
{
  async generalizeDatas()
  {
    let res = true
    res = res && await dataRepo.setDate('option')
    res = res && await dataRepo.transferOptionData()
    res = res && await dataRepo.setDate('futures_chip')
    res = res && await dataRepo.transferYesterdayData('futures_chip', 'futures_chip_log')
    res = res && await dataRepo.setDate('option_chip')
    res = res && await dataRepo.transferYesterdayData('option_chip', 'option_chip_log')
    return res
  }

  async getOptionItemInformed()
  {
    return await redisService.catch('OptionItemInformed', dataRepo.getOptionItemInformed)
  }

  async getOptionChipAccumulation()
  {
    return await redisService.catch('OptionChipAccumulation', dataRepo.getOptionChipAccumulation)
  }

  async getOptionHostory(date)
  {
    return await dataRepo.getOptionHostory(date)
  }

  async getTXO()
  {
    return await redisService.catch('TXO', dataRepo.getTXO)
  }

  async getOptionChip()
  {
    return await redisService.catch('OptionChip', dataRepo.getOptionChip)
  }

  async getOptionChipHistory(date)
  {
    return await dataRepo.getOptionChipHistory(date)
  }

  async getFuturesChip()
  {
    return await redisService.catch('FuturesChip', dataRepo.getFuturesChip)
  }

  async getFuturesChipHistory(date)
  {
    return await dataRepo.getFuturesChipHistory(date)
  }
}

module.exports = DataService
