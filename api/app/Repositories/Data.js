'use strict'

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

  async getOptionLastTime()
  {
    return await DB.table('option_item_informed')
  }

  async getOptionHostory()
  {
    return await DB.raw(`
      select name, sum(chip_valume) 
      from option_log 
      where name in (select name from option_item_informed) 
      group by name`)
  }

  async getTXO()
  {
    return await DB.table('txo').first()
  }

  async getOptionChip()
  {
    return await DB.table('option_chip')
  }

  async getFuturesChip()
  {
    return await DB.table('futures_chip')
  }
}

module.exports = DataRepo
