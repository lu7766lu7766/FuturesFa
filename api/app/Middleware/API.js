'use strict'

const CommonCodes = use('ApiCodes/Common')

class OutputMiddleware
{
  async handle({response}, next) {

    await next()
    const sendBody = {
      code: [CommonCodes.OK],
      data: response._lazyBody.content,
      querys: querys.length
        ? querys
        : '', // assign in AppProvider
      isRedis: global.isRedis
    }
    response.send(_.pickBy(sendBody))
  }
}

module.exports = OutputMiddleware
