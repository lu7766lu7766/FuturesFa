'use strict'

class DataCollectController
{
  constructor({socket, request, session, auth})
  {
    // console.log(auth)

    // const collect = session.get('DataCollect') || []
    // collect.push(socket.id)
    // session.put('DataCollect', collect)
    //
    // console.log(user)
    this.socket = socket
    this.request = request
    this.session = session
    this.auth = auth
    // this.startCounter()
    // console.log('a new subscription for news topic')
  }

  async onJoin(message)
  {
    console.log(message)
    // console.log(this.request.input('user_name'))
  }

  async onGetAllIDs(message)
  {

    // console.log(this.auth)
    // const user = await this.auth.getUser()
    // console.log(user, this.session.get)
    // this.socket.emit('getAllIDs', session.get('DataCollect'))
  }

  onClose({socket, session})
  {
    // same as: socket.on('close')
    // const ids = session.get('OptionItemInformedIDs')
    // ids.splice(ids.indexOf(socket.id), 1)
    // session.put('OptionItemInformedIDs', ids)
  }

  onError({socket})
  {
    // same as: socket.on('error')
    // console.log('join error', socket.id)
    // const ids = session.get('OptionItemInformedIDs')
    // ids.splice(ids.indexOf(socket.id), 1)
    // session.put('OptionItemInformedIDs', ids)
  }
}

module.exports = DataCollectController
