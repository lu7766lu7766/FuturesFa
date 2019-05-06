'use strict'

const Env = use('Env')
const CommonCodes = use('ApiCodes/Common')

class OutputMiddleware
{
  async handle({response}, next) {
    const querys = []
    if (Env.get('NODE_ENV', 'development') === 'development') {
      DB.on('query', _query => querys.push(_.pick(_query, ['bindings', 'sql'])))
    }
    await next()
    const sendBody = {
      code: [CommonCodes.OK],
      data: response._lazyBody.content,
      querys: querys.length ? querys : ''
    }
    response.send(_.pickBy(sendBody))
  }
}

module.exports = OutputMiddleware
