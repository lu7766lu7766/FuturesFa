'use strict'

const Task = use('Task')
const dateService = App.make('Service/Date')

// const Redis = use('Redis')

class DataGetter extends Task {
  static get schedule () {
    return `*/5 * * * * *`
  }

  async handle () {
    // console.log('Task DataGetter handle')
    // this.info('Task DataGetter handle')
    if (dateService.isDataTransferTime())
    {
      dataService.setOftenData()
      dataService.setOccasionallyData()
    }
  }
}

module.exports = DataGetter
