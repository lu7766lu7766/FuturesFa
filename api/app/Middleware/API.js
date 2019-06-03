'use strict'

const CommonCodes = use('ApiCodes/Common')

class OutputMiddleware
{
  async handle({response}, next)
  {
    // global.querys = []

    await next()
    const sendBody = {
      code: [CommonCodes.OK],
      data: response._lazyBody.content,
      // querys: querys.length
      //   ? querys
      //   : '', // assign in AppProvider
    }
    response.send(_.pickBy(sendBody))
  }
}

module.exports = OutputMiddleware
