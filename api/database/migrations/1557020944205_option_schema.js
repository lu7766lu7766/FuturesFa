'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionSchema extends Schema
{
  up()
  {
    this.dropTableIfExists('option')
    this.create('option', (table) =>
    {
      table.date('date').comment('開盤日期')
      table.string('name', 50).comment('商品名').notNullable().index()
      table.string('item', 20).comment('商品編號').notNullable()
      table.integer('chip_valume', 10).default(0).comment('籌碼量')
      table.decimal('price', 10, 2).default(0).comment('現價')
      table.decimal('quotation', 10, 1).default(0).comment('成交(報價)')
      table.datetime('created_at').comment('傳送時間').notNullable().index()
    })
  }

  down () {
    this.dropTableIfExists('option')
  }
}

module.exports = OptionSchema
