'use strict'

const dataRepo = App.make('Repositories/Data')

class DataService
{
  async generalizeDatas()
  {
    await dataRepo.setDate('option')
    await dataRepo.transferOptionData()
    await dataRepo.setDate('futures_chip')
    await dataRepo.transferAllData('futures_chip', 'futures_chip_log')
    await dataRepo.setDate('option_chip')
    await dataRepo.transferAllData('option_chip', 'option_chip_log')
    return true
  }
}

module.exports = DataService
