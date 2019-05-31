const Redis = use('Redis')
const RedisConfig = use('Config/Redis')

class RedisService
{
  async catch(key, func)
  {
    const timeKey = `${key}_time`, lockKey = `${key}_lock`, secs = RedisConfig[key] || 5
    let res
    let isLock = ((await Redis.get(lockKey)) === 'true')
    let time = await Redis.get(timeKey)
    if (isLock)
    {
      setTimeout(this.catch(key, func), 1000)
    }
    else if (!time || moment().diff(moment(time), 'seconds') >= secs)
    {
      // await Redis.quit([key, timeKey])
      await Redis.set(lockKey, 'true')
      res = await func()
      await Redis.set(timeKey, moment().getDateTime())
      await Redis.set(key, JSON.stringify(res))
      await Redis.set(lockKey, 'false')
      global.isRedis = false
    }
    else
    {
      res = JSON.parse(await Redis.get(key))
      global.isRedis = true
    }
    return res
  }
}

module.exports = RedisService
