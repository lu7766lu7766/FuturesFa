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

    let message = `
    Key：${key}
    鎖定：${isLock}
    上次更新時間：${time}
    現在時間${moment().getDateTime()}
    時間差：${moment().diff(moment(time), 'seconds')}`

    if (isLock)
    {
      return new Promise(resolve =>
      {
        let times = 0
        let timer = setInterval(async () =>
        {
          times++
          isLock = ((await Redis.get(lockKey)) === 'true')
          // 若是一秒後執行沒有被鎖住的話，代表可能之前的人已拿到資料，可以直接從快取拿資料
          if (!isLock)
          {
            isDBSQLConsole && console.log(message + '\nResult:快取lock\n')
            res = JSON.parse(await Redis.get(key))
            session.put(redisKey, true)
            resolve(res)
          }
          // 若是三次都被鎖住的話，代表可能永遠被鎖，直接ＤＢ拿取資料
          if (times++ > 1)
          {
            isDBSQLConsole && console.log(message + '\nResult:DB lock\n')
            // 先解開防止有人在等，會重複從DB提取
            await Redis.set(lockKey, 'false')
            res = await func()
            await Redis.set(timeKey, moment().getDateTime())
            await Redis.set(key, JSON.stringify(res))
            session.put(redisKey, false)
            resolve(res)
            clearInterval(timer)
          }
        }, 1000)
      })
    }
    // 若是沒有上次更新時間，或上次更新時間與現在時間相差一定秒數以上，從ＤＢ拿取資料
    else if (!time || moment().diff(moment(time), 'seconds') >= secs)
    {
      isDBSQLConsole && console.log(message + '\nResult:DB\n')
      // await Redis.quit([key, timeKey])
      await Redis.set(lockKey, 'true')
      res = await func()
      await Redis.set(timeKey, moment().getDateTime())
      await Redis.set(key, JSON.stringify(res))
      await Redis.set(lockKey, 'false')
      session.put(redisKey, false)
    }
    // 有上次更新時間，且時與現在時間相差在指定秒數以內，從快取取資料
    else
    {
      isDBSQLConsole && console.log(message + '\nResult:快取\n')
      res = JSON.parse(await Redis.get(key))
      session.put(redisKey, true)
    }
    return res
  }

  async get(key)
  {
    return JSON.parse(await Redis.get(key))
  }

  async set(key, data)
  {
    await Redis.set(key, JSON.stringify(data))
  }
}

module.exports = RedisService
