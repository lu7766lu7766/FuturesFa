'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SYSSchema extends Schema
{
  up()
  {
    this.dropTableIfExists('sys')
    this.create('sys', (table) =>
    {
      table.integer('version', 15).default(0).comment('版本號')
    })
  }

  down()
  {
    this.dropTableIfExists('sys')
  }
}

module.exports = SYSSchema