'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('role', (table) => {
      table.integer('id')
      table.string('name', 10)
    })
  }

  down () {
    this.drop('role')
  }
}

module.exports = RoleSchema
