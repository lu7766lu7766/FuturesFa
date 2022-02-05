"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class WeekSettleDelayHoliday extends Schema {
  up() {
    this.dropTableIfExists("week_settle_delay_holidays");
    this.create("week_settle_delay_holidays", table => {
      table.string("date", 10).comment("日期");
    });
  }

  down() {
    this.dropTableIfExists("week_settle_delay_holidays");
  }
}

module.exports = WeekSettleDelayHoliday;
