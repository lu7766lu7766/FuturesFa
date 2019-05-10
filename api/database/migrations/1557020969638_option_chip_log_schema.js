'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionChipSchema extends Schema
{
  up() {
    this.dropTableIfExists('option_chip_log')
    this.create('option_chip_log', (table) =>
    {
      table.date('date').comment('開盤日期').notNullable().index()
      table.decimal('total_c', 10, 2).default(0).comment('總C')
      table.decimal('total_p', 10, 2).default(0).comment('總P')
      table.decimal('differ_cp', 10, 2).default(0).comment('CP差額')
      table.datetime('created_at').comment('傳送時間')
    })
  }

  down() {
    this.dropTableIfExists('option_chip')
  }
}

module.exports = OptionChipSchema
