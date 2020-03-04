'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Holiday extends Schema
{
  up()
  {
    this.dropTableIfExists('wednesday_continue_holiday')
    this.create('wednesday_continue_holiday', (table) =>
    {
      table.string('date', 10).comment('日期')
    })
  }

  down()
  {
    this.dropTableIfExists('wednesday_continue_holiday')
  }
}

module.exports = Holiday
