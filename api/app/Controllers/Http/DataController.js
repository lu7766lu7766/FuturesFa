'use strict'

// const dataRepo = App.make('Repositories/Data')
const dataService = App.make('Service/Data')

class DataController
{
  async getOptionItemInformed()
  {
    return await dataService.getOptionItemInformedByRedis()
  }

  async getOptionChipAccumulation()
  {
    return await dataService.getOptionChipAccumulationByRedis()
  }

  // -------------
  async getTXO()
  {
    return await dataService.getTXOByRedis()
  }

  // -------------

  async getOptionChip()
  {
    return await dataService.getOptionChipByRedis()
  }

  async getFuturesChip()
  {
    return await dataService.getFuturesChipByRedis()
  }

  // -------------

  async generalizeDatas(ctx)
  {
    return await dataService.generalizeDatas(ctx)
  }

  async deleteTheDateDatas(ctx)
  {
    return await dataService.deleteTheDateDatas(ctx)
  }
}

module.exports = DataController
