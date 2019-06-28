'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionLogSchema extends Schema
{
  up()
  {
    this.dropTableIfExists('option_log')
    this.create('option_log', (table) =>
    {
      table.primary(['name', 'created_at'])
      table.date('date').comment('開盤日期').notNullable().index()
      table.string('name', 50).comment('商品名').notNullable().index()
      table.string('item', 20).comment('商品編號').notNullable()
      table.integer('chip_valume', 10).default(0).comment('籌碼量')
      table.decimal('price', 10, 2).default(0).comment('現價(成交,報價)')
      table.datetime('created_at').notNullable().comment('傳送時間').index()
      table.integer('week_mtx', 10).default(0).comment('週小台')
      table.integer('mtx', 10).default(0).comment('小台')
    })
  }

  down () {
    this.dropTableIfExists('option_log')
  }
}

module.exports = OptionLogSchema

