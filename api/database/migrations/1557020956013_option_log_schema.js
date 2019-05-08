'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionLogSchema extends Schema
{
  up () {
    this.create('option_log', (table) => {
      table.primary(['date', 'name'])
      table.date('date').comment('開盤日期').notNullable().index()
      table.string('name', 50).comment('商品名').notNullable().index()
      table.string('item', 20).comment('商品編號').notNullable().index()
      table.integer('chip_valume', 10).default(0).comment('籌碼量')
      table.decimal('price', 10, 2).default(0).comment('現價')
      table.datetime('created_at').notNullable().comment('傳送時間')
    })
  }

  down () {
    this.drop('option_log')
  }
}

module.exports = OptionLogSchema
