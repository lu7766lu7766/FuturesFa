'use strict'
const DataCodes = use('ApiCodes/Data2000')
const {rule} = require('indicative')

class InfoValidator
{
  get rules()
  {
    return {
      'name': 'required'
    }
  }

  get messages()
  {
    return {
      'name.required': DataCodes.NAME_IS_REQUIRED
    }
  }
}

module.exports = InfoValidator
