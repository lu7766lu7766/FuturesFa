const Redis = use('Redis')
const RedisConfig = use('Config/Redis')

class RedisService
{
  async catch(key, func)
  {
    const timeKey = `${key}_time`, secs = RedisConfig[key] || 5
    let res
    let time = await Redis.get(timeKey)

    if (!time || moment().diff(moment(time), 'seconds') >= secs)
    {
      // await Redis.quit([key, timeKey])
      await Redis.set(timeKey, moment().getDateTime())
      res = await func()
      await Redis.set(key, JSON.stringify(res))
    }
    else
    {
      res = JSON.parse(await Redis.get(key))
    }
    return res
  }
}

module.exports = RedisService
