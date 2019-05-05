'use strict'

const UserService = App.make('Service/User')

class UserController {
  async login(ctx) {
    return await UserService.login(ctx)
  }
}

module.exports = UserController
