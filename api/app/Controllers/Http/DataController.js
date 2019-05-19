'use strict'

// const dataRepo = App.make('Repositories/Data')
const dataService = App.make('Service/Data')

class DataController {
  async test(ctx)
  {
    return await dataService.generalizeDatas()
  }
}

module.exports = DataController
