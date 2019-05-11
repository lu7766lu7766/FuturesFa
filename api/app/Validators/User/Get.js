'use strict'
const UserCodes = use('ApiCodes/User1000')
const RoleConstant = use('Constants/Role')

class UserGetValidator
{
  get rules()
  {
    return {
      role_id: 'required|in:' + RoleConstant.validateString()
    }
  }

  get messages()
  {
    return {
      'role_id.required': UserCodes.ROLE_NOT_FOUND,
      'role_id.in': UserCodes.ROLE_NOT_FOUND
    }
  }
}

module.exports = UserGetValidator
