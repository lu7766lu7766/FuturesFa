'use strict'
const userRepo = App.make('Repositories/User')
const UserCodes = use('ApiCodes/User1000')

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
}

module.exports = UserService
