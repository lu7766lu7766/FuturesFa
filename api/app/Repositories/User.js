'use strict'
const UserModel = use('Models/User')
const RoleConstant = use('Constants/Role')

class UserRepo {
  async findUserByUserName(userName) {
    return await UserModel.findByOrFail('user_name', userName)
  }

  /**
   * get user list
   */
  async getUserList({page, perPage, roleID})
  {
    return await UserModel.query()
      .with('role')
      .where('role_id', roleID)
      .offset((page - 1) * perPage)
      .limit(perPage)
      .fetch()
  }

  /**
   * get user list total
   */
  async getUserListTotal({roleID})
  {
    return _.head(await UserModel.query().where('role_id', roleID).count('* as total'))
  }

  /**
   * create user
   */
  async createUser({userName, password, nickName, roleID, expireTime}) {
    const user = new UserModel()
    user.user_name = userName
    user.password = password
    user.nick_name = nickName
    user.role_id = roleID
    user.expire_time = expireTime
    await user.save()
    return true
  }

  /**
   * update user
   */
  async updateUser({target: user, id, password, nickName, roleID, expireTime}) {
    // const user = await UserModel.find(id)
    password && (user.password = password)
    user.nick_name = nickName
    user.role_id = roleID
    user.expire_time = expireTime
    return await user.save()
  }

  /**
   * create user
   */
  async deleteUser({target: user}) {
    // const user = await UserModel.find(id)
    return await user.delete()
  }

  /**
   * get expired tester
   */
  async getExpiredTester() {
    return await DB.table('users').select('id').where(function ()
    {
      this.whereNotNull('expire_time')
      this.where('role_id', RoleConstant.TESTER_CODE)
      this.where('expire_time', '<', moment().getDatetime())
    })
  }

  /**
   * delete expired tester
   */
  async clearExpiredTester(ids) {
    await DB.debug().table('tokens').whereIn('user_id', ids).delete()
    await DB.debug().table('users').whereIn('id', ids).delete()
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
