'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodayItemSchema extends Schema
{
  up () {
    this.raw('drop view if exists today_item')
    this.raw(`CREATE SQL SECURITY DEFINER VIEW futures.today_item AS select name, max(created_at) as last_time from option group by name`)
  }

  down () {
    this.raw('drop view if exists today_item')
  }
}

module.exports = TodayItemSchema
