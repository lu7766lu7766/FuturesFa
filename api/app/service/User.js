'use strict'
const userRepo = App.make('Repositories/User')
const UserCodes = use('ApiCodes/User1000')
const RoleConstant = use('Constants/Role')

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
   * 新增使用者(會員)
   */
  async createUser({request}) {
    return userRepo.createUser({
      userName: request.input('userName'),
      password: request.input('password'),
      nickName: request.input('nickName', request.input('userName')),
      roleID: request.input('roleID', RoleConstant.TESTER_CODE),
      expireTime: request.input('expireTime', moment().add(30, 'days').getDatetime())
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
   * 刪除測試帳號
   */
  async clearExpiredTester() {
    const ids = _.map(await userRepo.getExpiredTester(), 'id')
    return ids.length && await userRepo.clearExpiredTester(ids)
  }
}

module.exports = UserService
