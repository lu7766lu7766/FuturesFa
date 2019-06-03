const Redis = use('Redis')
const RedisConfig = use('Config/Redis')
const Env = use('Env')

class RedisService
{
  async catch(key, func, ctx)
  {
    const isDBSQLConsole = Env.get('DB_SQL_CONSOLE') === 'true'
    const {session, request} = ctx
    const redisKey = request.input('key') + 'isRedis'

    const timeKey = `${key}_time`, lockKey = `${key}_lock`, secs = RedisConfig[key] || 10
    let res
    let isLock = ((await Redis.get(lockKey)) === 'true')
    let time = await Redis.get(timeKey)

    isDBSQLConsole &&
    console.log(`
    Key：${key}
    鎖定：${isLock}
    上次更新時間：${time}
    現在時間${moment().getDateTime()}
    時間差：${moment().diff(moment(time), 'seconds')}`)

    if (isLock)
    {
      return new Promise(resolve =>
      {
        let times = 0
        let timer = setInterval(async () =>
        {
          times++
          isLock = ((await Redis.get(lockKey)) === 'true')
          if (!isLock)
          {
            isDBSQLConsole && console.log('Result:快取lock\n')
            res = JSON.parse(await Redis.get(key))
            session.put(redisKey, true)
            resolve(res)
          }
          if (times++ > 1)
          {
            isDBSQLConsole && console.log('Result:DB lock\n')
            res = await func()
            await Redis.set(timeKey, moment().getDateTime())
            await Redis.set(key, JSON.stringify(res))
            await Redis.set(lockKey, 'false')
            session.put(redisKey, false)
            resolve(res)
            clearInterval(timer)
          }
        }, 1000)
      })
    }
    else if (!time || moment().diff(moment(time), 'seconds') >= secs)
    {
      isDBSQLConsole && console.log('Result:DB\n')
      // await Redis.quit([key, timeKey])
      await Redis.set(lockKey, 'true')
      res = await func()
      await Redis.set(timeKey, moment().getDateTime())
      await Redis.set(key, JSON.stringify(res))
      await Redis.set(lockKey, 'false')
      session.put(redisKey, false)
    }
    else
    {
      isDBSQLConsole && console.log('Result:快取\n')
      res = JSON.parse(await Redis.get(key))
      session.put(redisKey, true)
    }
    return res
  }
}

module.exports = RedisService
