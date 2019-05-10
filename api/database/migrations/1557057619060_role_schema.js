'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema
{
  up () {
    this.dropTableIfExists('roles')
    this.create('roles', (table) =>
    {
      table.integer('id')
      table.string('name', 10)
    })
  }

  down () {
    this.dropTableIfExists('roles')
  }
}

module.exports = RoleSchema
