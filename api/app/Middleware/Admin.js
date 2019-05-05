'use strict'

const RoleConstant = use('Constants/Role')
const UserCodes = use('ApiCodes/User1000')

class AdminMiddleware
{
  async handle({auth}, next) {
    const user = await auth.getUser()
    if (user.role_id == RoleConstant.ADMIN_CODE)
    {
      await next()
    }
    else
    {
      throw new ApiErrorException(UserCodes.NO_PERMISSION)
    }
  }
}

module.exports = AdminMiddleware
