'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionSchema extends Schema {
  up () {
    this.create('option', (table) => {
      // table.date('date').comment('開盤日期')
      table.string('name', 50).comment('商品名').notNullable()
      table.integer('month', 2).comment('月份').notNullable()
      table.integer('week', 1).comment('週數')
      table.string('type', 2).comment('商品種類CP').notNullable()
      table.string('item', 20).comment('商品編號').notNullable().index()
      table.integer('chip_valume', 10).default(0).comment('籌碼量')
      table.decimal('price', 10, 2).default(0).comment('現價')
      table.datetime('created_at').comment('傳送時間').notNullable().index()
    })
  }

  down () {
    this.drop('option')
  }
}

module.exports = OptionSchema
