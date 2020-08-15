"use strict";

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

class LogSeeder {
  async run() {
    await DB.table("futures_chip_log").insert({
      date: "2020-07-15",
      major_chip_valume: "0",
      retail_chip_valume: "0",
      differ: "0",
      created_at: "2020-07-15 15:00"
    });
    await DB.table("option_accumulation").insert({
      date: "2020-07-15",
      name: "台指選07W4 C 10900",
      item: "10000",
      chip_valume: "0",
      price: "0.00",
      created_at: "2020-07-15 15:00",
      week_mtx: "10000",
      mtx: "10000",
      is_big_volume: "0"
    });
    await DB.table("option_chip_log").insert({
      date: "2020-01-01",
      total_c: "0.00",
      total_p: "0.00",
      created_at: "2020-07-15 15:00"
    });
    await DB.table("option_log").insert({
      date: "2020-07-15",
      name: "台指選07W4 C 10900",
      item: "10000",
      chip_valume: "0",
      price: "0.00",
      created_at: "2020-07-15 15:00",
      week_mtx: "10000",
      mtx: "10000",
      is_big_volume: "0"
    });
  }
}

module.exports = LogSeeder;
