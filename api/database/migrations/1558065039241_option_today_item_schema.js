'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionTodayItemSchema extends Schema
{
  up () {
    this.raw('drop view if exists option_today_item')
    this.raw(`CREATE SQL SECURITY DEFINER VIEW futures.option_today_item AS 
      select name, max(created_at) as last_time 
      from option 
      group by name`)
  }

  down () {
    this.raw('drop view if exists option_today_item')
  }
}

module.exports = OptionTodayItemSchema
