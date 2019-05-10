'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema
{
  async up() {
    const rand = Math.round(Math.random() * 100000)
    this.dropTableIfExists('users')
    this.create('users', (table) =>
    {
      table.increments()
      // table.string('id', 100).notNullable().unique()
      table.string('user_name', 40).notNullable().unique()
      table.string('password', 150).notNullable()
      table.string('nick_name', 20)
      table.integer('role_id', 1).notNullable()
      table.datetime('expire_time')
      table.timestamps()
    }).raw('ALTER TABLE `users` AUTO_INCREMENT=' + rand)
  }

  down() {
    this.dropTableIfExists('users')
  }
}

module.exports = UserSchema
