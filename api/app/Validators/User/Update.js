'use strict'
const UserCodes = use('ApiCodes/User1000')
const RoleConstant = use('Constants/Role')
const {rule} = require('indicative')

class UserCreateValidator
{
  get rules() {
    return {
      id: 'required',
      password: 'min:6',
      nickName: 'max:20',
      roleID: 'in:' + RoleConstant.validateString(),
      expireTime: [
        rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
      ]
    }
  }

  get messages() {
    return {
      'id.required': UserCodes.USER_ID_IS_REQUIRED,
      'password.min': UserCodes.PASSWORD_IS_TOO_SHORT,
      'nickName.max': UserCodes.NICK_NAME_TOO_LONG,
      'roleID.in': UserCodes.ROLE_NOT_FOUND,
      'expireTime.dateFormat': UserCodes.EXPIRE_TIME_FORMAT_ERROR
    }
  }
}

module.exports = UserCreateValidator
