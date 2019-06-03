'use strict'

const Task = use('Task')
const frondEnv = require('../../../env')

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
