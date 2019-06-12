'use strict'
const SysCodes = use('ApiCodes/Sys3000')

class UserCreateValidator
{
  get rules()
  {
    return {
      data: 'required|in:0,1'
    }
  }

  get messages()
  {
    return {
      'data.required': SysCodes.DATA_IS_REQUIRED,
      'data.in': SysCodes.DATA_ERROR
    }
  }
}

module.exports = UserCreateValidator
