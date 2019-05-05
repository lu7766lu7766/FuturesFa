'use strict'
const userRepo = App.make('Repositories/User')

class UserService {
  async login({request, auth}) {
    const {userName, password} = request.all()
    const tokenData = await auth.attempt(userName, password)
    const user = await userRepo.findUserByUserName(userName)


    // 新登入需刪棄用舊的token // 若是需要多處登入，則移除這行
    await userRepo.deleteOldTokensByUser(user)

    tokenData.data = `${tokenData.type} ${tokenData.token}`

    return tokenData
  }
}

module.exports = UserService
