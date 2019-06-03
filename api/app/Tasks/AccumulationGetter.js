'use strict'

const Task = use('Task')
const frondEnv = require('../../../env')
const dataService = App.make('Service/Data')
const Redis = use('Redis')

class AccumulationGetter extends Task {
  static get schedule () {
    return `*/${frondEnv.accumulationUpdateSecs - 1} * * * * *`
  }

  async handle () {
    // this.info('Task AccumulationGetter handle')
    Redis.set('OptionChipAccumulation', JSON.stringify(await dataService.getOptionChipAccumulation()))
  }
}

module.exports = AccumulationGetter
