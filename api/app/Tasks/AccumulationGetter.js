'use strict'

const Task = use('Task')
const dataService = App.make('Service/Data')

// const Redis = use('Redis')

class AccumulationGetter extends Task {
  static get schedule () {
    return `0 0 * * * *`
  }

  async handle () {
    // this.info('Task AccumulationGetter handle')
    // Redis.set('OptionChipAccumulation', JSON.stringify(await dataService.getOptionChipAccumulation()))
    dataService.setOccasionallyData()
  }
}

module.exports = AccumulationGetter
