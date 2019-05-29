'use strict'
const UserCodes = use('ApiCodes/User1000')

class UserCreateValidator
{
  get rules()
  {
    return {
      id: 'required',
      password: 'min:6',
      nick_name: 'max:20'
    }
  }

  get messages()
  {
    return {
      'id.required': UserCodes.USER_ID_IS_REQUIRED,
      'password.min': UserCodes.PASSWORD_IS_TOO_SHORT,
      'nick_name.max': UserCodes.NICK_NAME_TOO_LONG
    }
  }
}

module.exports = UserCreateValidator
