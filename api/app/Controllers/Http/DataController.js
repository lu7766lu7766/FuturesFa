'use strict'

// const dataRepo = App.make('Repositories/Data')
const dataService = App.make('Service/Data')

class DataController
{
  // ------------- option

  async getOptionItemInformed()
  {
    return await dataService.getOptionItemInformedByRedis()
  }

  async getOptionChipAccumulation()
  {
    return await dataService.getOptionChipAccumulationByRedis()
  }

  // ------------- txo

  async getTXO()
  {
    return await dataService.getTXOByRedis()
  }

  // ------------- chip

  async getOptionChip()
  {
    return await dataService.getOptionChipByRedis()
  }

  async getFuturesChip()
  {
    return await dataService.getFuturesChipByRedis()
  }

  // ------------- history

  async getHistory(ctx)
  {
    return await dataService.getHistory(ctx)
  }

  // ------------- data generalize

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
