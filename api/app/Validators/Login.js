'use strict'
const UserCodes = use('ApiCodes/User1000')

class LoginValidator
{
  get rules() {
    return {
      user_name: 'required',
      password: 'required'
    }
  }

  get messages() {
    return {
      'user_name.required': UserCodes.USER_NAME_IS_REQUIRED,
      'password.required': UserCodes.PASSWORD_IS_REQUIRED
    }
  }
}

module.exports = LoginValidator
