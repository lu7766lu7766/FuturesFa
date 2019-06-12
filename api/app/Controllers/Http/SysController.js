'use strict'

const sysService = App.make('Service/Sys')

class SysController {
  async version()
  {
    return await sysService.getVersion()
  }

  async updateVersion() {
    return await sysService.updateVersion()
  }

  async isMonthItemEndWeek()
  {
    return await sysService.getIsMonthItemEndWeek()
  }

  async updateMonthItemEndWeek(ctx)
  {
    return await sysService.updateMonthItemEndWeek(ctx)
  }
}

module.exports = SysController
