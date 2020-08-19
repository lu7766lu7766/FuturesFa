"use strict";

const Task = use("Task");

class DeleteNoUse extends Task {
  static get schedule() {
    return "0 */1 * * * *";
  }

  async handle() {
    console.log("start clear no use data, let system  be faster");
    await DB.table("option")
      .whereBetween("created_at", [
        moment()
          .subtract(1, "minutes")
          .add(5, "seconds")
          .getDateTime(),
        moment()
          .subtract(15, "seconds")
          .getDateTime()
      ])
      .delete();
  }
}

module.exports = DeleteNoUse;
