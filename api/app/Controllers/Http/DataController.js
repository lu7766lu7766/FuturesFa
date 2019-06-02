'use strict'

// const dataRepo = App.make('Repositories/Data')
const dataService = App.make('Service/Data')

class DataController
{
  async getOptionItemInformed(ctx)
  {
    return await dataService.getOptionItemInformed(ctx)
  }

  async getOptionChipAccumulation(ctx)
  {
    return await dataService.getOptionChipAccumulation(ctx)
  }

  // -------------
  async getTXO(ctx)
  {
    return await dataService.getTXO(ctx)
  }

  // -------------

  async getOptionChip(ctx)
  {
    return await dataService.getOptionChip(ctx)
  }

  async getFuturesChip(ctx)
  {
    return await dataService.getFuturesChip(ctx)
  }

  // -------------

  async generalizeDatas()
  {
    return await dataService.generalizeDatas()
  }
}

module.exports = DataController
