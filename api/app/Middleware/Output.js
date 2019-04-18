'use strict'

const CommonCodes = use('ApiCodes/Common')

class OutputMiddleware
{
  async handle({response}, next) {
    await next()
    response.send({
      code: [CommonCodes.OK],
      data: response._lazyBody.content
    })
  }
}

module.exports = OutputMiddleware
