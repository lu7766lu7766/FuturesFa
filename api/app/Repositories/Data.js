'use strict'
const startTime = moment().subtract(40, 'days').getDateTime()
const endTime = moment().getDateTime()
const dataEndTime = moment().getDate() + ' 14:00:00'

class DataRepo
{
  async setDate(table)
  {

    return await DB.table(table).update({
      date: moment().subtract(1, 'days').getDate()
    }).where('created_at', '<', dataEndTime)
  }

  async transferOptionData()
  {
    const trx = await DB.beginTransaction()
    try
    {
      await trx.raw(`insert into option_log select * from option_item_informed where created_at < ?`, [dataEndTime])
      await trx.table('option').delete()
      return trx.commit()
    } catch (e)
    {
      console.log(e)
      trx.rollback()
      Log.error(e)
      return false
    }
  }

  async transferYesterdayData(source, target)
  {
    return await this.transferData(`insert into \`${target}\` select * from \`${source}\` where created_at < '${dataEndTime}'`, source)
  }

  async transferData(sql, source)
  {
    const trx = await DB.beginTransaction()
    try
    {
      await trx.raw(sql)
      await trx.table(source).delete()
      return trx.commit()
    } catch (e)
    {
      console.log(e)
      trx.rollback()
      Log.error(e)
      return false
    }
  }

  async getOptionTodayItem()
  {
    return await DB.table('option_today_item').select('name')
  }

  async getOptionItemInformed()
  {
    return await DB.table('option_item_informed')
  }

  async getOptionChipAccumulation()
  {
    const todayItem = DB.table('option_today_item').select('name')
    return await DB.table('option_log').select('name', 'item').sum('chip_valume as total_chip')
      .whereIn('name', todayItem)
      .whereBetween('date', [startTime, endTime])
      .groupBy('name')
  }

  async getOptionHostory(date)
  {
    return await DB.table('option_log').where('date', date)
  }

  async getTXO()
  {
    return await DB.table('txo').first()
  }

  async getOptionChip()
  {
    return await DB.table('option_chip')
  }

  async getOptionChipHistory(date)
  {
    return await DB.table('option_chip_log').where('date', date)
  }

  async getFuturesChip()
  {
    return await DB.table('futures_chip')
  }

  async getFuturesChipHistory(date)
  {
    return await DB.table('futures_chip_log').where('date', date)
  }
}

module.exports = DataRepo
