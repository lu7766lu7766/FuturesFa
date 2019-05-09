'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuturesChipSchema extends Schema
{
  up () {
    this.dropTableIfExists('futures_chip')
    this.create('futures_chip', (table) =>
    {
      table.date('date').comment('開盤日期')
      table.integer('major_chip_valume', 10).default(0).comment('大戶籌碼量')
      table.integer('retail_chip_valume', 10).default(0).comment('散戶籌碼量')
      table.decimal('differ', 10, 2).default(0).comment('筆差')
      table.datetime('created_at').comment('傳送時間')
    })
  }

  down () {
    this.drop('futures_chip')
  }
}

module.exports = FuturesChipSchema
