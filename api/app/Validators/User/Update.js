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
      nick_name: 'max:20',
      role_id: 'in:' + RoleConstant.validateString(),
      expire_time: [
        rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
      ]
    }
  }

  get messages() {
    return {
      'id.required': UserCodes.USER_ID_IS_REQUIRED,
      'password.min': UserCodes.PASSWORD_IS_TOO_SHORT,
      'nick_name.max': UserCodes.NICK_NAME_TOO_LONG,
      'role_id.in': UserCodes.ROLE_NOT_FOUND,
      'expire_time.dateFormat': UserCodes.EXPIRE_TIME_FORMAT_ERROR
    }
  }
}

module.exports = UserCreateValidator
