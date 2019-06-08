'use strict'
const redisService = App.make('Service/Redis')

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

  async onClose(socket)
  {
    const DataCollect = await redisService.get('DataCollect')
    delete DataCollect[this.auth.user.user_name]
    redisService.set('DataCollect', DataCollect)
    // same as: socket.on('close')
  }

  onError({socket})
  {
    // same as: socket.on('error')
  }
}

module.exports = DataCollectController
