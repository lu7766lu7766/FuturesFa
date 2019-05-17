'use strict'

const Task = use('Task')
const dataService = App.make('Service/Data')

class DataGeneralize extends Task {
  // do data generalize every 14:00 Am
  static get schedule () {
    return '* * 14 * * *'
    // return '*/1 * * * * *'
  }

  async handle () {
    // this.info('Task DataGeneralize handle')
    await dataService.generalizeDatas()
  }
}

module.exports = DataGeneralize
