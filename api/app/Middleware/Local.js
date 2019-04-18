'use strict'

const CommonCodes = use('ApiCodes/Common')

class LocalMiddleware
{
  async handle({request, response}, next) {
    if (request.ip() == '127.0.0.1')
    {
      await next()
    }
    else
    {
      throw new ApiErrorException(CommonCodes.ERROR)
    }
  }
}

module.exports = LocalMiddleware
