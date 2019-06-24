'use strict'

const Task = use('Task')
const frondEnv = require('../../../env')
const dataService = App.make('Service/Data')

// const Redis = use('Redis')

class DataGetter extends Task {
  static get schedule () {
    return `*/${frondEnv.optionUpdateSecs - 2} * * * * *`
  }

  async handle () {
    // console.log('Task DataGetter handle')
    // this.info('Task DataGetter handle')
    dataService.setOftenData()
    dataService.setOccasionallyData()
  }
}

module.exports = DataGetter
