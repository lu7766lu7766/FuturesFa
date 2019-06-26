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

    const DataCollect = (await redisService.get('DataCollect')) || {}
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
    const data = await dataService.getOptionTodayItem(name)
    const mustVolume = await dataService.getOptionTodayItemMustVolume(name)
    await redisService.set(redisKey, data)

    this.socket.emitTo('itemInfoReady', {data, mustVolume}, [this.socket.id])

    const collect = (await redisService.get('OptionTodayItemCollect')) || {}
    collect[this.auth.user.user_name] = collect[this.auth.user.user_name]
      ? collect[this.auth.user.user_name]
      : []
    collect[this.auth.user.user_name].push(name)
    await redisService.set('OptionTodayItemCollect', collect)
  }

  async onStopWatching(name)
  {
    const collect = (await redisService.get('OptionTodayItemCollect'))
    collect[this.auth.user.user_name].splice(collect[this.auth.user.user_name].indexOf(name), 1)
    await redisService.set('OptionTodayItemCollect', collect)
  }

  async onClose(socket)
  {
    await this.clearData('DataCollect', this.auth.user.user_name)
    // same as: socket.on('close')
    // await this.clearData('OptionTodayItemCollect', this.auth.user.user_name)
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
