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
    // this.info('Task DataGetter handle')
    await dataService.setOftenData()
  }
}

module.exports = DataGetter
