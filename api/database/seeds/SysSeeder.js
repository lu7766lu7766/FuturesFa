'use strict'

/*
 |--------------------------------------------------------------------------
 | UserSeeder
 |--------------------------------------------------------------------------
 |
 | Make use of the Factory instance to seed database with dummy data or
 | make use of Lucid models directly.
 |
 */

/** @type {import('@adonisjs/lucid/src/Factory')} */

class UserSeeder
{
  async run()
  {
    await DB.table('sys').insert({
      version: 0
    })
  }
}

module.exports = UserSeeder
