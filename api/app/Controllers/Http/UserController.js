'use strict'

const userService = App.make('Service/User')

class UserController {
  async login(ctx) {
    return await userService.login(ctx)
  }

  /**
   * 新增使用者(會員)
   */
  async createUser(ctx) {
    return await userService.createUser(ctx)
  }

  /**
   * 新增測試帳號
   */
  async createTester(ctx) {
    return await userService.createTester(ctx)
  }
}

module.exports = UserController
