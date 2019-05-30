'use strict'

const dataRepo = App.make('Repositories/Data')

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
