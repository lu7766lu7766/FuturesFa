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
    const yesterday = moment()
      .subtract(1, "days")
      .getDate();
    await DB.table("futures_chip_log").insert({
      date: yesterday,
      major_chip_valume: "0",
      retail_chip_valume: "0",
      differ: "0",
      created_at: yesterday + " 15:00"
    });
    await DB.table("option_accumulation").insert({
      date: yesterday,
      name: "台指選07W4 C 10900",
      item: "10000",
      chip_valume: "0",
      price: "0.00",
      created_at: yesterday + " 15:00",
      week_mtx: "10000",
      mtx: "10000",
      is_big_volume: "0"
    });
    await DB.table("option_chip_log").insert({
      date: yesterday,
      total_c: "0.00",
      total_p: "0.00",
      created_at: yesterday + " 15:00"
    });
    await DB.table("option_log").insert({
      date: yesterday,
      name: "台指選07W4 C 10900",
      item: "10000",
      chip_valume: "0",
      price: "0.00",
      created_at: yesterday + " 15:00",
      week_mtx: "10000",
      mtx: "10000",
      is_big_volume: "0"
    });
  }
}

module.exports = LogSeeder;
