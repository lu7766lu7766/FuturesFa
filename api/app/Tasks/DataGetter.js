'use strict'

const Task = use('Task')
const frondEnv = require('../../../env')
const dataService = App.make('Service/Data')

class DataGetter extends Task {
  static get schedule () {
    return `*/${frondEnv.optionUpdateSecs - 1} * * * * *`
  }

  async handle () {
    // this.info('Task DataGetter handle')
    Redis.set('OptionItemInformed', JSON.stringify(await dataService.getOptionItemInformed()))
    Redis.set('TXO', JSON.stringify(await dataService.getTXO()))
    Redis.set('OptionChip', JSON.stringify(await dataService.getOptionChip()))
    Redis.set('FuturesChip', JSON.stringify(await dataService.getFuturesChip()))
  }
}

module.exports = DataGetter
