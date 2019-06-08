'use strict'
const DataCodes = use('ApiCodes/Data2000')
const {rule} = require('indicative')

class HistoryValidator
{
  get rules()
  {
    return {
      dateTime: [
        rule('required'),
        rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
      ]
    }
  }

  get messages()
  {
    return {
      'dateTime.required': DataCodes.DATE_TIME_IS_REQUIRED,
      'dateTime.dateFormat': DataCodes.FORMAT_ERROR
    }
  }
}

module.exports = HistoryValidator
