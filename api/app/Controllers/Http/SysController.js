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
}

module.exports = SysController
