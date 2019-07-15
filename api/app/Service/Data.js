'use strict'

const dataRepo = App.make('Repositories/Data')
const redisService = App.make('Service/Redis')
const CommonCodes = use('ApiCodes/Common')
const dateService = App.make('Service/Date')

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
    const dataStartAndEndTime = dataRepo.getDateStartAndEndTime(params.date)
    return this.deleteDatas(async (trx) =>
    {
      await dataRepo.deleteTheDateData(trx, 'option', dataStartAndEndTime)
      await dataRepo.deleteTheDateData(trx, 'futures_chip', dataStartAndEndTime)
      await dataRepo.deleteTheDateData(trx, 'option_chip', dataStartAndEndTime)
    })
  }

  async clearOlderDatas()
  {
    // dd(moment().getDateTime())
    const dataStartAndEndTime = [
      moment().subtract(365, 'days').format('YYYY-MM-DD 15:00:00'),
      moment().subtract(8, 'days').format('YYYY-MM-DD 14:00:00')
    ]
    // console.log(dataStartAndEndTime)
    return this.deleteDatas(async (trx) =>
    {
      await dataRepo.deleteTheDateData(trx, 'option_log', dataStartAndEndTime)
      await dataRepo.deleteTheDateData(trx, 'option_accumulation', dataStartAndEndTime)
      await dataRepo.deleteTheDateData(trx, 'futures_chip_log', dataStartAndEndTime)
      await dataRepo.deleteTheDateData(trx, 'option_chip_log', dataStartAndEndTime)
    })
  }

  async deleteDatas(f)
  {
    const trx = await DB.beginTransaction()
    try
    {
      await f(trx)
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

  buildOptionTodayItemRedisKey(name)
  {
    return 'OptionTodayItem_' + name
  }

  async getOptionTodayItem(name)
  {
    const res = await dataRepo.getOptionTodayItem(name)

    if (!res.length)
    {
      const date = await dataRepo.getInfoLastDate()
      return await dataRepo.getOptionHostoryByDateName(moment(date).getDate(), name)
    }
    else
    {
      return res
    }
  }

  async getOptionTodayItemMustVolume(name)
  {
    const res = await dataRepo.getOptionTodayItemMustVolume(name)
    if (!res.length)
    {
      const date = await dataRepo.getInfoLastDate()
      return await dataRepo.getOptionHostoryMustVolumeByDateName(moment(date).getDate(), name)
    }
    else
    {
      return res
    }
  }

  async getOptionTodayItemByRedis({request})
  {
    return await redisService.get(this.buildOptionTodayItemRedisKey(request.input('name')))
  }

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
    // Log.info(JSON.stringify(res))
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
    const startTime = dateService.getTransferStartTime(moment())
    const endTime = dateService.getTransferEndTime(moment())
    const res = await dataRepo.getOptionChip(startTime, endTime)
    if (!res.toJSON().length || dateService.isRestTime())
    {
      const date = await dataRepo.getInfoLastDate()
      return dataRepo.getOptionChipHistory(
        moment(date).format('YYYY-MM-DD 15:00:00'),
        //moment(date).add(1, 'days').format('YYYY-MM-DD 13:45:10'))
        dateService.getTransferEndTime(moment(date).format('YYYY-MM-DD 15:00:00'))
      )
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
    const startTime = dateService.getTransferStartTime(moment())
    const endTime = dateService.getTransferEndTime(moment())
    const res = await dataRepo.getFuturesChip(startTime, endTime)
    if (!res.toJSON().length || dateService.isRestTime())
    {
      const date = await dataRepo.getInfoLastDate()
      console.log(dateService.getTransferEndTime(moment(date).format('YYYY-MM-DD 15:00:00')))
      return dataRepo.getFuturesChipHistory(
        moment(date).format('YYYY-MM-DD 15:00:00'),
        // moment(date).add(1, 'days').format('YYYY-MM-DD 13:45:10'))
        dateService.getTransferEndTime(moment(date).format('YYYY-MM-DD 15:00:00'))
      )
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


  async setAllOptionData()
  {
    this.setOftenData()
    this.setOccasionallyData()
  }

  async setOftenData()
  {
    const res = this.getItemInfo(await this.getOptionItemInformed())
    // Log.info(JSON.stringify({
    //   status: 'dataGetter',
    //   res
    // }))
    await redisService.set('OptionItemInformed', res)
    await redisService.set('TXO', (await this.getTXO()))
    await redisService.set('OptionChip', (await this.getOptionChip()))
    await redisService.set('FuturesChip', (await this.getFuturesChip()))
    await this.watchingItemsGetter()
  }

  async watchingItemsGetter()
  {
    const collect = await redisService.get('OptionTodayItemCollect')
    const allItemName = _.uniq(_.flatten(_.map(collect)))
    for (const name of allItemName)
    {
      const redisKey = this.buildOptionTodayItemRedisKey(name)
      const res = await this.getOptionTodayItem(name)
      await redisService.set(redisKey, res)
    }
  }

  async setOccasionallyData()
  {
    await redisService.set('OptionChipAccumulation', this.getItemInfo(await this.getOptionChipAccumulation()))
  }
  /////// history

  async getHistory({request})
  {
    // const startTime = moment(request.input('dateTime')).subtract(15, 'minutes').getDateTime()
    const endTime = moment(request.input('dateTime')).getDateTime()
    const date = this.getDateByTime(endTime)

    const itemNames = _.map((await dataRepo.getItemNamesByDate(date)), 'name')
    const option = this.getItemInfo(await dataRepo.getOptionHostory(date, endTime))
    const option_accumulation = this.getItemInfo(await dataRepo.getOptionAccumulationHostory(date, itemNames))
    const option_chip = await dataRepo.getOptionChipHistory(moment(date).format('YYYY-MM-DD 15:00:00'), endTime)
    const futures_chip = await dataRepo.getFuturesChipHistory(moment(date).format('YYYY-MM-DD 15:00:00'), endTime)
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

  getItemInfo(datas)
  {
    return _.map(_.mapValues(datas, data =>
    {
      const {1: month, 2: week, 3: type} = data.name.match(/([01][0-9])W?([1-5])? ([CP])/)
      return {
        month,
        week,
        type,
        ...data
      }
    }))
  }
}

module.exports = DataService
