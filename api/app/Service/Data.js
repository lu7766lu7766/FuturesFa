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
    res = res && await dataRepo.transferOptionData(date)
    res = res && await dataRepo.transferTheDateData('futures_chip', 'futures_chip_log', date)
    res = res && await dataRepo.transferTheDateData('option_chip', 'option_chip_log', date)
    return res
  }

  async deleteTheDateDatas({params})
  {
    const trx = await DB.beginTransaction()
    const dataStartAndEndTime = dataRepo.getDateStartAndEndTime(params.date)
    try
    {
      await dataRepo.deleteTheDateData(trx, 'option', dataStartAndEndTime)
      await dataRepo.deleteTheDateData(trx, 'futures_chip', dataStartAndEndTime)
      await dataRepo.deleteTheDateData(trx, 'option_chip', dataStartAndEndTime)
      trx.commit()
      return true
    } catch (e)
    {
      console.log(e)
      trx.rollback()
      Log.error(e)
      return false
    }
  }

  ////////////

  async getOptionItemInformed()
  {
    return await dataRepo.getOptionItemInformed()
  }

  async getOptionItemInformedByRedis()
  {
    return await redisService.get('OptionItemInformed')
  }

  async getOptionChipAccumulation()
  {
    return await dataRepo.getOptionChipAccumulation()
  }

  async getOptionChipAccumulationByRedis()
  {
    return await redisService.get('OptionChipAccumulation')
  }

  async getTXO()
  {
    return await dataRepo.getTXO()
  }

  async getTXOByRedis()
  {
    return await redisService.get('TXO')
  }

  async getOptionChip()
  {
    return await dataRepo.getOptionChip()
  }

  async getOptionChipByRedis()
  {
    return await redisService.get('OptionChip')
  }

  async getFuturesChip()
  {
    return await dataRepo.getFuturesChip()
  }

  async getFuturesChipByRedis()
  {
    return await redisService.get('FuturesChip')
  }

  async setAllOptionData()
  {
    this.setOftenData()
    this.setOccasionallyData()
  }

  async setOftenData()
  {
    await redisService.set('OptionItemInformed', (await this.getOptionItemInformed()))
    await redisService.set('TXO', (await this.getTXO()))
    await redisService.set('OptionChip', (await this.getOptionChip()))
    await redisService.set('FuturesChip', (await this.getFuturesChip()))
  }

  async setOccasionallyData()
  {
    await redisService.set('OptionChipAccumulation', (await this.getOptionChipAccumulation()))
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
