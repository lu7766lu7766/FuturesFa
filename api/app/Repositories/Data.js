'use strict'

class DataRepo
{
  async setDate(table)
  {
    return DB.table(table).update({
      date: moment().subtract(1, 'days').getDate()
    })
  }

  async transferOptionData(source, target)
  {
    return await this.transferData(
      `insert into ${target}
        select b.* from
          (select name, max(created_at) as last_time from ${source} group by name) as a
          left join ${source} as b on a.name = b.name and a.last_time = b.created_at`
      , source)
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
      // await trx.table(source).delete()
      trx.commit()
    } catch (e)
    {
      console.log(e)
      trx.rollback()
      Log.error(e)
    }
  }
}

module.exports = DataRepo
