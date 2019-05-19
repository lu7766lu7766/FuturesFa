'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionItemInformedSchema extends Schema
{
  up()
  {
    this.raw('drop view if exists option_item_informed')
    this.raw(`CREATE SQL SECURITY DEFINER VIEW futures.option_item_informed AS 
      select b.* from option_today_item as a
      left join option as b on a.name = b.name and a.last_time = b.created_at`)
  }

  down()
  {
    this.raw('drop view if exists option_item_informed')
  }
}

module.exports = OptionItemInformedSchema
