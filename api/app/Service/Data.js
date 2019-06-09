'use strict'

const dataRepo = App.make('Repositories/Data')
const redisService = App.make('Service/Redis')
const CommonCodes = use('ApiCodes/Common')

class DataService
{

  // ------------- data generalize

  async generalizeDatas(ctx)
  {
    let res = true
    const date = ctx
      ? ctx.request.input('date', moment().subtract(1, 'days').getDate())
      : moment().subtract(1, 'days').getDate()
    res = res && await dataRepo.transferOptionData(date)
    res = res && await dataRepo.transferTheDateData('futures_chip', 'futures_chip_log', date)
    res = res && await dataRepo.transferTheDateData('option_chip', 'option_chip_log', date)
    if (res)
    {
      return res
    }
    else
    {
      throw new ApiErrorException(CommonCodes.ERROR)
    }
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

  // ------------- option

  async getOptionItemInformed()
  {
    const res = await dataRepo.getOptionItemInformed()
    if (!res.length)
    {
      const date = await dataRepo.getInfoLastDate()
      const itemNames = _.map((await dataRepo.getItemNamesByDate(date)), 'name')
      return dataRepo.getOptionHostory(date, moment(date).add(1, 'days').format('YYYY-MM-DD 15:00:00'), itemNames)
    }
    else
    {
      return res
    }
  }

  async getOptionItemInformedByRedis()
  {
    return await redisService.get('OptionItemInformed')
  }

  async getOptionChipAccumulation()
  {
    const res = await dataRepo.getOptionChipAccumulation()
    if (!res.length)
    {
      const date = await dataRepo.getInfoLastDate()
      const itemNames = _.map((await dataRepo.getItemNamesByDate(date)), 'name')
      return dataRepo.getOptionAccumulationHostory(date, itemNames)
    }
    else
    {
      return res
    }
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
    const res = await dataRepo.getOptionChip()
    if (!res.length)
    {
      const date = await dataRepo.getInfoLastDate()
      return dataRepo.getOptionChipHistory(
        moment(date).format('YYYY-MM-DD 15:00:00'),
        moment(date).add(1, 'days').format('YYYY-MM-DD 13:45:10'))
    }
    else
    {
      return res
    }
  }

  async getOptionChipByRedis()
  {
    return await redisService.get('OptionChip')
  }

  async getFuturesChip()
  {
    const res = await dataRepo.getFuturesChip()
    if (!res.length)
    {
      const date = await dataRepo.getInfoLastDate()
      return dataRepo.getFuturesChipHistory(
        moment(date).format('YYYY-MM-DD 15:00:00'),
        moment(date).add(1, 'days').format('YYYY-MM-DD 13:45:10'))
    }
    else
    {
      return res
    }
  }

  async getFuturesChipByRedis()
  {
    return await redisService.get('FuturesChip')
  }

  // ------------- data setting
  isDataTransferTime()
  {
    const now = moment()
    switch (now.format('e'))
    {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        return now.isBetween(now.format('YYYY-MM-DD 15:00:00'), now.format('YYYY-MM-DD 23:59:59')) ||
          now.isBetween(now.format('YYYY-MM-DD 00:00:00'), now.format('YYYY-MM-DD 05:00:00')) ||
          now.isBetween(now.format('YYYY-MM-DD 08:45:00'), now.format('YYYY-MM-DD 13:45:00'))
        break
      case '6':
        return now.isBetween(now.format('YYYY-MM-DD 00:00:00'), now.format('YYYY-MM-DD 05:00:00'))
        break
      default:
        return false
        break
    }
  }

  async setAllOptionData()
  {
    this.setOftenData()
    this.setOccasionallyData()
  }

  async setOftenData()
  {
    if (!this.isDataTransferTime()) return
    await redisService.set('OptionItemInformed', (await this.getOptionItemInformed()))
    await redisService.set('TXO', (await this.getTXO()))
    await redisService.set('OptionChip', (await this.getOptionChip()))
    await redisService.set('FuturesChip', (await this.getFuturesChip()))
  }

  async setOccasionallyData()
  {
    if (!this.isDataTransferTime()) return
    await redisService.set('OptionChipAccumulation', (await this.getOptionChipAccumulation()))
  }
  /////// history

  async getHistory({request})
  {
    const startTime = moment(request.input('dateTime')).subtract(15, 'minutes').getDateTime()
    const endTime = moment(request.input('dateTime')).getDateTime()
    const date = this.getDateByTime(endTime)

    const itemNames = _.map((await dataRepo.getItemNamesByDate(date)), 'name')
    const option = await dataRepo.getOptionHostory(date, endTime, itemNames)
    const option_accumulation = await dataRepo.getOptionAccumulationHostory(date, itemNames)
    const option_chip = await dataRepo.getOptionChipHistory(startTime, endTime)
    const futures_chip = await dataRepo.getFuturesChipHistory(startTime, endTime)
    return {
      option, option_accumulation, option_chip, futures_chip
    }
  }

  getDateByTime(time)
  {
    return moment(time).isBefore(moment(time).format('YYYY-MM-DD 14:00:00'))
      ? moment(time).subtract(1, 'days').getDate()
      : moment(time).getDate()
  }
}

module.exports = DataService
