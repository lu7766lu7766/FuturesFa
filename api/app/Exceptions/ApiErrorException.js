'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

class ApiErrorException extends LogicalException
{
  constructor(status, message = false, code) {
    super(message, status, code)
  }

  /**
   * Handle this exception by itself
   */
  static handle(error, {request, response}) {
    // console.log(error, error.message)
    const transBody = {
      code: [error.status],
      data: error.message
    }
    Log.info(JSON.stringify(transBody))
    response.send(transBody)
  }
}

module.exports = ApiErrorException
