'use strict'

/*
 |--------------------------------------------------------------------------
 | TxoSeeder
 |--------------------------------------------------------------------------
 |
 | Make use of the Factory instance to seed database with dummy data or
 | make use of Lucid models directly.
 |
 */

/** @type {import('@adonisjs/lucid/src/Factory')} */

class TxoSeeder
{
  async run() {
    await DB.table('txo').insert({
      taiex_updown: 0
    })
  }
}

module.exports = TxoSeeder
