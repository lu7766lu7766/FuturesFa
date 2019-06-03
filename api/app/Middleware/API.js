'use strict'

const CommonCodes = use('ApiCodes/Common')

class OutputMiddleware
{
  async handle({response, request, session}, next)
  {
    // global.querys = []
    const redisKey = request.input('key') + 'isRedis'
    session.put(redisKey, false)
    await next()
    const isRedis = session.get(redisKey)
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
