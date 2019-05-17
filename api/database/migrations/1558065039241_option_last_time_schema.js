'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionLastTimeSchema extends Schema {
  up () {
    this.dropTableIfExists('option_last_time')
    this.raw(`CREATE SQL SECURITY DEFINER VIEW futures.option_last_time AS select b.* from
      (select name, max(created_at) as last_time from option group by name) as a
      left join option as b on a.name = b.name and a.last_time = b.created_at`)
  }

  down () {
    this.drop('option_last_time')
  }
}

module.exports = OptionLastTimeSchema
