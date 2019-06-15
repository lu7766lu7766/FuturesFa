'use strict'
const redisService = App.make('Service/Redis')
const dataService = App.make('Service/Data')

class DataCollectController
{
  constructor({socket, auth})
  {
    this.socket = socket
    this.auth = auth
  }

  async onJoin()
  {
    const user = {
      id: this.auth.user.id,
      user_name: this.auth.user.user_name,
      nick_name: this.auth.user.nick_name
    }

    const DataCollect = await redisService.get('DataCollect')
    DataCollect[user.user_name] = user
    redisService.set('DataCollect', DataCollect)
  }

  async onGetOnlineMembers()
  {
    this.socket.emitTo('getOnlineMembers', (await redisService.get('DataCollect') || {}), [this.socket.id])
  }

  async onWatchingItem(name)
  {
    const redisKey = dataService.buildOptionTodayItemRedisKey(name)
    const res = await dataService.getOptionTodayItem(name)
    await redisService.set(redisKey, res)

    this.socket.emitTo('todayItemReady', redisKey, [this.socket.id])

    const OptionTodayItemCollect = (await redisService.get('OptionTodayItemCollect'))
    OptionTodayItemCollect[this.auth.user.user_name] = name
    await redisService.set('OptionTodayItemCollect', OptionTodayItemCollect)
  }

  async onClose(socket)
  {
    await this.clearData('DataCollect', this.auth.user.user_name)
    // same as: socket.on('close')
    await this.clearData('OptionTodayItemCollect', this.auth.user.user_name)
  }

  async clearData(redisKey, key)
  {
    const Collect = (await redisService.get(redisKey))
    delete Collect[key]
    await redisService.set(redisKey, Collect)
  }

  onError({socket})
  {
    // same as: socket.on('error')
  }
}

module.exports = DataCollectController
