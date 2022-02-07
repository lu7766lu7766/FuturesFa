'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SYSSchema extends Schema
{
  up()
  {
    this.dropTableIfExists('sys')
    this.create('sys', (table) =>
    {
      table.integer('version', 15).default(0).comment('版本號')
      table.integer('is_month_item_end_week', 1).default(0).comment('是否為月選結算週')
      // table.string('special_week_settle_date', 10).comment('特別週結日')
      table.integer('special_main_week', 1).default(0).comment('特別週')
    })
  }

  down()
  {
    this.dropTableIfExists('sys')
  }
}

module.exports = SYSSchema
