'use strict'

const OptionChipModel = use('Models/OptionChip')
const FuturesChipModel = use('Models/FuturesChip')
const OptionChipLogModel = use('Models/OptionChipLog')
const FuturesChipLogModel = use('Models/FuturesChipLog')

class DataRepo
{
  // ------------- data generalize

  getDateStartAndEndTime(date)
  {
    return [moment(date).format('YYYY-MM-DD 15:00:00'), moment(date).add(1, 'days').format('YYYY-MM-DD 14:00:00')]
  }

  async setDate(trx, table, date)
  {
    const dataStartAndEndTime = this.getDateStartAndEndTime(date)
    if (trx && typeof trx === 'function')
    {
      await trx.table(table).update({date}).whereBetween('created_at', dataStartAndEndTime)
    }
    else
    {
      await DB.table(table).update({date}).whereBetween('created_at', dataStartAndEndTime)
    }
  }

  async deleteTheDateData(trx, table, dataStartAndEndTime)
  {
    if (trx && typeof trx === 'function')
    {
      await trx.table(table).delete().whereBetween('created_at', dataStartAndEndTime)
    }
    else
    {
      await DB.table(table).delete().whereBetween('created_at', dataStartAndEndTime)
    }
  }

  async transferOptionData(date)
  {
    const dataStartAndEndTime = this.getDateStartAndEndTime(date)
    const trx = await DB.beginTransaction()
    try
    {
      await this.setDate(trx, 'option', date)
      await trx.raw(`
        insert into option_accumulation
          (select b.* 
            from (select name, max(created_at) as last_time from option where created_at between ? and ? group by name) as a 
            left join option as b on a.name = b.name and a.last_time = b.created_at) `, dataStartAndEndTime)
      await trx.raw(`insert into option_log select * from option where created_at between ? and ?`, dataStartAndEndTime)
      await this.deleteTheDateData(trx, 'option', dataStartAndEndTime)
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

  async transferTheDateData(source, target, date)
  {
    const dataStartAndEndTime = this.getDateStartAndEndTime(date)
    const trx = await DB.beginTransaction()
    try
    {
      await this.setDate(trx, source, date)
      await trx.raw(`insert into ${target} select * from ${source} where created_at between ? and ?`, dataStartAndEndTime)
      await this.deleteTheDateData(trx, source, dataStartAndEndTime)
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

  async getInfoLastDate()
  {
    return moment(_.first(await DB.table('option_accumulation').max('date as last_date')).last_date).getDateTime()
  }

  async getOptionItemInformed()
  {
    return await DB.table('option_item_informed')
      .select('name', 'item', 'chip_valume', 'price', 'created_at', 'week_mtx', 'mtx')
  }

  async getOptionTodayItem(name)
  {
    return await DB.table('option')
      .select('name', 'item', 'chip_valume', 'price', 'created_at', 'week_mtx', 'mtx')
      .where('name', name)
  }

  async getOptionTodayItemMustVolume(name)
  {
    return await DB.table('option')
      .max('chip_valume as max_volume')
      .min('chip_valume as min_volume')
      .where('name', name)
  }

  async getOptionChipAccumulation()
  {
    // 防止選到去年同期商品
    const startTime = moment().subtract(40, 'days').getDateTime()
    const endTime = moment().getDateTime()
    const itemsName = _.map(await DB.select('name').table('option_item_informed'), 'name')
    return itemsName.length
      ? await DB.table('option_accumulation').select('name', 'item').sum('chip_valume as total_chip')
        .whereIn('name', itemsName)
        .whereBetween('date', [startTime, endTime])
        .groupBy('name')
      : []
  }

  async getTXO()
  {
    return await DB.table('txo').orderBy('created_at', 'desc').first()
  }

  async getOptionChip(startTime, endTime)
  {
    return await OptionChipModel.query()
      .select('total_c', 'total_p', 'differ_cp', 'created_at')
      .where('created_at', '>=', startTime)
      .where('created_at', '<=', endTime)
      .fetch()
    // return await DB.table('option_chip').select('total_c', 'total_p', 'differ_cp', 'created_at')
  }

  async getFuturesChip(startTime, endTime)
  {
    return await FuturesChipModel.query()
      .select('major_chip_valume', 'retail_chip_valume', 'differ', 'created_at')
      .where('created_at', '>=', startTime)
      .where('created_at', '<=', endTime)
      .fetch()
    // return await DB.table('futures_chip').select('major_chip_valume', 'retail_chip_valume', 'differ', 'created_at')
  }

  // ------------- history

  async getItemNamesByDate(date)
  {
    return await DB.table('option_accumulation').where('date', date).select('name')
  }

  async getOptionHostoryByDateName(date, name)
  {
    return await DB.table('option_log')
      .select('name', 'item', 'chip_valume', 'price', 'created_at', 'week_mtx', 'mtx')
      .where('date', date)
      .where('name', name)
  }

  async getOptionHostoryMustVolumeByDateName(date, name)
  {
    return await DB.table('option_log')
      .max('chip_valume as max_volume')
      .min('chip_valume as min_volume')
      .where('date', date)
      .where('name', name)
  }

  async getOptionHostory(date, endTime)
  {
    return _.first(await DB.raw(`
      select b.* from (
        select name, max(created_at) as last_time 
        from option_log 
        where date = ? 
        and created_at <= ?
        group by name) as a
      left join option_log as b
      on a.name = b.name and a.last_time = b.created_at
    `, [date, endTime]))
  }

  async getOptionAccumulationHostory(date, itemNames)
  {
    const dataStartDate = moment(date).subtract(40, 'days').getDate()
    return itemNames.length
      ? await DB.table('option_accumulation')
        .select('name', 'item')
        .sum('chip_valume as total_chip')
        .where('date', '<', date)
        .where('date', '>', dataStartDate)
        .whereIn('name', itemNames)
        .groupBy('name')
      : []
  }

  async getOptionChipHistory(startTime, endTime)
  {
    return await OptionChipLogModel.query()
      .select('total_c', 'total_p', 'differ_cp', 'created_at')
      .whereBetween('created_at', [startTime, endTime])
      .fetch()
  }

  async getFuturesChipHistory(startTime, endTime)
  {
    return await await FuturesChipLogModel.query()
      .select('major_chip_valume', 'retail_chip_valume', 'differ', 'created_at')
      .whereBetween('created_at', [startTime, endTime])
      .fetch()
  }
}

module.exports = DataRepo
