'use strict'
const UserCodes = use('ApiCodes/User1000')

class UserCreateValidator
{
  get rules() {
    return {
      id: 'required'
    }
  }

  get messages() {
    return {
      'id.required': UserCodes.USER_ID_IS_REQUIRED
    }
  }
}

module.exports = UserCreateValidator
