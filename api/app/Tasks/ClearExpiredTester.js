'use strict'

const Task = use('Task')
const userService = App.make('Service/User')

class ClearExpiredTester extends Task {
  /**
   * a hour again
   */
  static get schedule () {
    return '* * */1 * * *'
    // return '*/1 * * * * *'
  }

  async handle () {
    // this.info('Task ClearTester handle')
    return await userService.clearExpiredTester()
  }
}

module.exports = ClearExpiredTester
