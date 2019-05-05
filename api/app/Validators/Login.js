'use strict'
const UserCodes = use('ApiCodes/User1000')

class LoginValidator
{
  get rules() {
    return {
      userName: 'required',
      password: 'required'
    }
  }

  get messages() {
    return {
      'userName.required': UserCodes.USER_NAME_IS_REQUIRED,
      'password.required': UserCodes.PASSWORD_IS_REQUIRED
    }
  }
}

module.exports = LoginValidator
