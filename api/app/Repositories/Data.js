'use strict'
const startTime = moment().subtract(40, 'days').getDateTime()
const endTime = moment().getDateTime()

class DataRepo
{
  async setDate(table)
  {
    return DB.table(table).update({
      date: moment().subtract(1, 'days').getDate()
    })
  }

  async transferOptionData()
  {
    const trx = await DB.beginTransaction()
    try
    {
      await trx.raw(`insert into option_log select * from option_item_informed`)
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

  async transferAllData(source, target)
  {
    return await this.transferData(`insert into \`${target}\` select * from \`${source}\``, source)
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

  async getOptionItemInformed()
  {
    return await DB.table('option_item_informed')
  }

  async getOptionChipAccumulation()
  {
    return await DB.raw(`
      select name, sum(chip_valume) as total_chip
      from option_log 
      where name in (select name from option_today_item) 
        and date = '${startTime}' and '${endTime}'
      group by name`)
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

  async getFuturesChip(date)
  {
    return await DB.table('futures_chip_log').where('date', date)
  }
}

module.exports = DataRepo
