'use strict'

const dataEndTime = moment().format('YYYY-MM-DD 14:00:00')
const OptionChipModel = use('Models/OptionChip')
const FuturesChipModel = use('Models/FuturesChip')

class DataRepo
{
  ///////////////////// 資料整理start
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
        insert into option_accumulation
          (select b.* 
            from (select name, max(created_at) as last_time from option where created_at < ? group by name) as a 
            left join option as b on a.name = b.name and a.last_time = b.created_at) `, [dataEndTime])
      await trx.raw(`insert into option_log select * from option where created_at < ?`, [dataEndTime])
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

  ///////////////////// 資料整理end

  ///////////////////// 資料取得start
  async getOptionItemInformed()
  {
    return await DB.select('name', 'item', 'chip_valume', 'price', 'created_at').table('option_item_informed')
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

  async getOptionHostory(endTime)
  {
    return await DB.table('option_log').where('created_at', '<', endTime).orderBy('created_at', 'desc').limit(1)
  }

  async getTXO()
  {
    return await DB.table('txo').first()
  }

  async getOptionChip()
  {
    return await OptionChipModel.query().select('total_c', 'total_p', 'differ_cp', 'created_at').fetch()
    // return await DB.table('option_chip').select('total_c', 'total_p', 'differ_cp', 'created_at')
  }

  async getOptionChipHistory(startTime, endTime)
  {
    return await DB.table('option_chip_log').whereBetween('created_at', [startTime, endTime])
  }

  async getFuturesChip()
  {
    return await FuturesChipModel.query()
      .select('major_chip_valume', 'retail_chip_valume', 'differ', 'created_at')
      .fetch()
    // return await DB.table('futures_chip').select('major_chip_valume', 'retail_chip_valume', 'differ', 'created_at')
  }

  async getFuturesChipHistory(startTime, endTime)
  {
    return await DB.table('futures_chip_log').whereBetween('created_at', [startTime, endTime])
  }

  ///////////////////// 資料取得end
}

module.exports = DataRepo
