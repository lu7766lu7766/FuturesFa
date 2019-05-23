'use strict'
const startTime = moment().subtract(40, 'days').getDateTime()
const endTime = moment().getDateTime()
const dataEndTime = moment().getDate() + ' 14:00:00'

class DataRepo
{
  async setDate(table)
  {
    try
    {
      await DB.table(table).update({
        date: moment().subtract(1, 'days').getDate()
      }).where('created_at', '<', dataEndTime)
      return true
    } catch (e)
    {
      console.log(e)
      Log.error(e)
      return false
    }
  }

  async transferOptionData()
  {
    const trx = await DB.beginTransaction()
    try
    {
      await trx.raw(`
        insert into option_log 
          (select b.* 
            from (select name, max(created_at) as last_time from option where created_at < '${dataEndTime}' group by name) as a 
            left join option as b on a.name = b.name and a.last_time = b.created_at) `)
      await trx.table('option').delete().where('created_at', '<', dataEndTime)
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
      await trx.table(source).delete().where('created_at', '<', dataEndTime)
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
