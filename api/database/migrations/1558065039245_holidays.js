"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class Holiday extends Schema {
  up() {
    this.dropTableIfExists("holidays");
    this.create("holidays", table => {
      table.string("date", 10).comment("日期");
    });
  }

  down() {
    this.dropTableIfExists("holidays");
  }
}

module.exports = Holiday;
