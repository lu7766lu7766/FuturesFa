'use strict'
const UserCodes = use('ApiCodes/User1000')

class UserCreateValidator
{
  get rules() {
    return {
      id: 'required|exists:users,id'
    }
  }

  get messages() {
    return {
      'id.required': UserCodes.USER_ID_IS_REQUIRED,
      'id.exists': UserCodes.USER_NOT_FOUND
    }
  }
}

module.exports = UserCreateValidator
