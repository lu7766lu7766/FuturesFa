'use strict'
const UserModel = use('Models/User')
const RoleConstants = use('Constants/Role')

class UserRepo {
  async findUserByUserName(userName) {
    return UserModel.findByOrFail('user_name', userName)
  }

  async clearExpiredTester() {
    await DB.table('users').where(function ()
      {
        this.whereNotNull('expire_time')
        this.where('role_id', RoleConstants.TESTER_CODE)
        this.where('expire_time', '<', moment().getDatetime())
      }
    ).delete()
    return true
  }
  /**
   * delete older access token
   * it will cause could not login with multi device
   */
  async deleteOldTokensByUser(user) {
    const lastToken = await DB.table('tokens').where('user_id', user.id).select('id').last()
    await DB.table('tokens').where('user_id', user.id).whereNot('id', lastToken.id).update('is_revoked', 1)
    // .delete() // 不刪除可作登入記錄之留存
  }
}

module.exports = UserRepo
