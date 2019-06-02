'use strict'

const CommonCodes = use('ApiCodes/Common')

class OutputMiddleware
{
  async handle({response, session}, next)
  {
    // global.querys = []
    session.put('isRedis', false)
    await next()
    const isRedis = session.get('isRedis')
    const sendBody = {
      code: [CommonCodes.OK],
      data: response._lazyBody.content,
      // querys: querys.length
      //   ? querys
      //   : '', // assign in AppProvider
      isRedis
    }
    response.send(_.pickBy(sendBody))
  }
}

module.exports = OutputMiddleware
