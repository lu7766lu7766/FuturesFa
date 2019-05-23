'use strict'

// const dataRepo = App.make('Repositories/Data')
const dataService = App.make('Service/Data')

class DataController
{
  async getOptionTodayItem()
  {
    return await dataService.getOptionTodayItem()
  }

  async getOptionItemInformed()
  {
    return await dataService.getOptionItemInformed()
  }

  async getOptionChipAccumulation()
  {
    return await dataService.getOptionChipAccumulation()
  }

  // -------------
  async getTXO()
  {
    return await dataService.getTXO()
  }

  // -------------

  async generalizeDatas()
  {
    return await dataService.generalizeDatas()
  }
}

module.exports = DataController
