'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema
{
  async up() {
    const rand = Math.round(Math.random() * 100000)
    this.create('users', (table) =>
    {
      table.increments()
      // table.string('id', 100).notNullable().unique()
      table.string('user_name', 40).notNullable().unique()
      table.string('password', 150).notNullable()
      table.string('nick_name', 20)
      table.string('phone', 10)
      table.integer('point').notNullable().default(0)
      table.integer('role_id')
      table.integer('parent_id')
      table.timestamps()
    }).raw('ALTER TABLE `users` AUTO_INCREMENT=' + rand)
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
