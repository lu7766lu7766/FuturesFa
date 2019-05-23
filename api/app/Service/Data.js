'use strict'

const dataRepo = App.make('Repositories/Data')

class DataService
{
  async generalizeDatas()
  {
    await dataRepo.setDate('option')
    await dataRepo.transferOptionData()
    await dataRepo.setDate('futures_chip')
    await dataRepo.transferYesterdayData('futures_chip', 'futures_chip_log')
    await dataRepo.setDate('option_chip')
    await dataRepo.transferYesterdayData('option_chip', 'option_chip_log')
    return true
  }

  async getOptionTodayItem()
  {
    return await dataRepo.getOptionTodayItem()
  }

  async getOptionItemInformed()
  {
    return await dataRepo.getOptionItemInformed()
  }

  async getOptionChipAccumulation()
  {
    return await dataRepo.getOptionChipAccumulation()
  }

  async getOptionHostory(date)
  {
    return await dataRepo.getOptionHostory(date)
  }

  async getTXO()
  {
    return await dataRepo.getTXO()
  }

  async getOptionChip()
  {
    return await dataRepo.getOptionChip()
  }

  async getOptionChipHistory(date)
  {
    return await dataRepo.getOptionChipHistory(date)
  }

  async getFuturesChip()
  {
    return await dataRepo.getFuturesChip()
  }

  async getFuturesChipHistory(date)
  {
    return await dataRepo.getFuturesChipHistory(date)
  }
}

module.exports = DataService
