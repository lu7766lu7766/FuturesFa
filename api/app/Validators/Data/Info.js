'use strict'
const DataCodes = use('ApiCodes/Data2000')
const {rule} = require('indicative')

class InfoValidator
{
  get rules()
  {
    return {
      dateTime: [
        rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
      ]
    }
  }

  get messages()
  {
    return {
      'dateTime.dateFormat': DataCodes.FORMAT_ERROR
    }
  }
}

module.exports = InfoValidator
