'use strict'
const userRepo = App.make('Repositories/User')
const UserCodes = use('ApiCodes/User1000')
const RoleConstant = use('Constants/Role')
const RootConstant = use('Constants/Root')
const UserModel = use('Models/User')

class UserService
{
  async login({request, auth}) {
    const {userName, password} = request.all()
    const tokenData = await auth.attempt(userName, password)
    const user = await userRepo.findUserByUserName(userName)

    if (user.expire_time && moment(user.expire_time).diff(moment(), 'secs') < 0)
    {
      throw new ApiErrorException(UserCodes.USER_EXPIRED)
    }

    // 新登入需刪棄用舊的token // 若是需要多處登入，則移除這行
    await userRepo.deleteOldTokensByUser(user)

    tokenData.data = `${tokenData.type} ${tokenData.token}`

    return tokenData
  }

  /**
   * 取得使用者資訊
   */
  async getUserInfo({auth}) {
    return await auth.getUser()
  }

  /**
   * 取得使用者列表
   */
  async getUserList({request}) {
    return await userRepo.getUserList({
      page: request.input('page', 1),
      perPage: request.input('perPage', 2)
    })
  }

  /**
   * 取得使用者列表總數
   */
  async getUserListTotal() {
    return await userRepo.getUserListTotal()
  }

  /**
   * 新增使用者(會員)
   */
  async createUser({request}) {
    return userRepo.createUser({
      userName: request.input('user_name'),
      password: request.input('password'),
      nickName: request.input('nick_name', request.input('user_name')),
      roleID: request.input('role_id'),
      expireTime: request.input('expire_time', moment().add(30, 'days').getDatetime())
    })
  }

  /**
   * 新增測試帳號
   */
  async createTester({request}) {
    const crypto = require('crypto')
    const count = request.input('count', 1)
    const users = []
    _.forEach(_.range(0, count), index =>
    {
      const user = {
        userName: crypto.randomBytes(32).toString('hex').substr(0, 8),
        password: crypto.randomBytes(32).toString('base64').substr(0, 8),
        nickName: 'Tester' + moment().unix() + '_' + index,
        roleID: RoleConstant.TESTER_CODE,
        expireTime: moment().add(7, 'days').getDatetime()
      }
      users.push(user)
    })
    _.forEach(users, async user =>
    {
      await userRepo.createUser(user)
    })

    return _.map(users, user => _.pick(user, ['userName', 'password', 'expireTime']))
  }

  /**
   * 更新使用者(會員)
   */
  async updateUser({request, auth}) {
    const id = request.input('id')
    const source = await auth.getUser()
    const target = await UserModel.find(id)

    if (!target)
    {
      throw new ApiErrorException(UserCodes.USER_NOT_FOUND)
    }
    else if (RootConstant.enum().indexOf(source.user_name) > -1)
    {
      if (target.user_name === RootConstant.ANTHOR &&
        source.user_name !== RootConstant.ANTHOR)
      {
        throw new ApiErrorException(UserCodes.NO_PERMISSION)
      }
      else if (target.user_name === RootConstant.ROOT &&
        RootConstant.enum().indexOf(source.user_name) === -1)
      {
        throw new ApiErrorException(UserCodes.NO_PERMISSION)
      }
    }
    return userRepo.updateUser({
      target,
      id,
      password: request.input('password'),
      nickName: request.input('nick_name'),
      roleID: request.input('role_id'),
      expireTime: request.input('expire_time')
    })
  }

  /**
   * 刪除使用者(會員)
   */
  async deleteUser({request}) {
    const id = request.input('id')
    const target = await UserModel.find(id)
    if (!target)
    {
      throw new ApiErrorException(UserCodes.USER_NOT_FOUND)
    }
    else if (RootConstant.enum().indexOf(target.user_name) > -1)
    {
      throw new ApiErrorException(UserCodes.NO_PERMISSION)
    }
    return userRepo.deleteUser({
      target
    })
  }

  /**
   * 刪除測試帳號
   */
  async clearExpiredTester() {
    const ids = _.map(await userRepo.getExpiredTester(), 'id')
    return ids.length && await userRepo.clearExpiredTester(ids)
  }
}

module.exports = UserService
