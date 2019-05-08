'use strict'
const UserCodes = use('ApiCodes/User1000')
const RoleConstant = use('Constants/Role')

class UserCreateValidator
{
  get rules() {
    return {
      id: 'required|exists:users,id',
      password: 'min:6',
      nickName: 'max:20',
      roleID: 'in:' + RoleConstant.validateString(),
      expireTime: 'dateFormat:YYYY-MM-DD hh:mm:ss'
    }
  }

  get messages() {
    return {
      'id.required': UserCodes.USER_ID_IS_REQUIRED,
      'id.exists': UserCodes.USER_NOT_FOUND,
      'password.min': UserCodes.PASSWORD_IS_TOO_SHORT,
      'nickName.max': UserCodes.NICK_NAME_TOO_LONG,
      'roleID.in': UserCodes.ROLE_NOT_FOUND,
      'expireTime.dateFormat': UserCodes.EXPIRE_TIME_FORMAT_ERROR
    }
  }
}

module.exports = UserCreateValidator
