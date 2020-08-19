"use strict";

const Task = use("Task");

class DeleteNoUse extends Task {
  static get schedule() {
    return "0 */1 * * * *";
  }

  async handle() {
    const start_at = moment()
      .subtract(1, "minutes")
      .add(5, "seconds")
      .getDateTime();
    const end_at = moment()
      .subtract(15, "seconds")
      .getDateTime();
    console.log(`clear ${start_at}~${end_at} data`);
    await DB.table("option")
      .whereBetween("created_at", [start_at, end_at])
      .delete();
  }
}

module.exports = DeleteNoUse;
