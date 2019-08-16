'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionSchema extends Schema
{
  up()
  {
    this.dropTableIfExists('option_accumulation')
    this.create('option_accumulation', (table) =>
    {
      table.primary(['date', 'name'])
      table.date('date').comment('開盤日期').notNullable().index()
      table.string('name', 50).comment('商品名').notNullable().index()
      table.string('item', 20).comment('商品編號').notNullable()
      table.integer('chip_valume', 10).default(0).comment('籌碼量')
      table.decimal('price', 10, 2).default(0).comment('現價(成交,報價)')
      table.datetime('created_at').notNullable().comment('傳送時間')
      table.integer('week_mtx', 10).default(0).comment('週小台')
      table.integer('mtx', 10).default(0).comment('小台')
      table.integer('is_big_volume', 1).default(0).comment('是否大成交量')
    })
  }

  down()
  {
    this.dropTableIfExists('option_accumulation')
  }
}

module.exports = OptionSchema
