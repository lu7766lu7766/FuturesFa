'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TxoSchema extends Schema
{
  up () {
    this.dropTableIfExists('txo')
    this.create('txo', (table) => {
      table.integer('taiex', 10).default(0).comment('加權')
      table.integer('taiex_updown', 6).default(0).comment('加權漲跌')
      table.decimal('taiex_updown_range', 6, 2).default(0).comment('加權漲跌幅')
      table.integer('mtx', 10).default(0).comment('台指')
      table.integer('mtx_updown', 6).default(0).comment('台指漲跌')
      table.decimal('mtx_updown_range', 6, 2).default(0).comment('台指漲跌幅')
      table.integer('major', 6).default(0).comment('大戶(夜)')
      table.integer('retail', 6).default(0).comment('散戶(夜)')
      table.decimal('differ', 6, 2).default(0).comment('筆差')
      table.decimal('total_c', 10, 2).default(0).comment('總C')
      table.decimal('total_p', 10, 2).default(0).comment('總P')
      table.decimal('differ_cp', 10, 2).default(0).comment('CP差額')
      table.datetime('created_at').comment('傳送時間')
    })
  }

  down () {
    this.dropTableIfExists('txo')
  }
}

module.exports = TxoSchema
