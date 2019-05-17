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
      await trx.raw(`insert into option_log select * from option_last_time`)
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
}

module.exports = DataRepo
