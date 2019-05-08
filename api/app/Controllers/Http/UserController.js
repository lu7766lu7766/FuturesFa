'use strict'

const userService = App.make('Service/User')

class UserController {
  async login(ctx) {
    return await userService.login(ctx)
  }

  /**
   * 取得使用者列表
   */
  async getUsers(ctx) {
    return await userService.getUsers(ctx)
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

  /**
   * 更新使用者(會員)
   */
  async updateUser(ctx) {
    return await userService.updateUser(ctx)
  }


  /**
   * 刪除使用者(會員)
   */
  async daleteUser(ctx) {
    return await userService.deleteUser(ctx)
  }

  /**
   * 更新使用者(會員)
   */
  async deleteUser(ctx) {
    return await userService.deleteUser(ctx)
  }
}

module.exports = UserController
