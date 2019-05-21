'use strict'

const Task = use('Task')
const userService = App.make('Service/User')

class ClearExpiredTester extends Task {
  // 每小時0分0秒執行
  static get schedule () {
    return '0 0 * * * *'
  }

  async handle () {
    // this.info('Task ClearExpiredTester handle')
    await userService.clearExpiredTester()
  }
}

module.exports = ClearExpiredTester
