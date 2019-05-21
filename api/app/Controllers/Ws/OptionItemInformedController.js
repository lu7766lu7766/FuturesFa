'use strict'
const dataService = App.make('Service/Data')

class OptionItemInformedController
{
  constructor({socket, request, session})
  {
    const ids = session.get('OptionItemInformedDatas') || []
    ids.push(socket.id)
    session.put('OptionItemInformedIDs', ids)
    this.socket = socket
    this.request = request
    // this.startCounter()
    // console.log('a new subscription for news topic')
  }

  async startCounter()
  {
    this.timer = setInterval(this.getDatas, 5 * 1000)
  }

  async getDatas()
  {
    this.datas = await dataService.getOptionItemInformed()
    this.socket.emit('getDatas', this.datas)
  }

  async onGetAllIDs()
  {
    this.socket.emit('getAllIDs', session.get('OptionItemInformedIDs'))
  }


  onClose({socket})
  {
    // same as: socket.on('close')
    const ids = session.get('OptionItemInformedIDs')
    ids.splice(ids.indexOf(socket.id), 1)
    session.put('OptionItemInformedIDs', ids)
  }

  onError({socket})
  {
    // same as: socket.on('error')
    console.log('join error', socket.id)
    const ids = session.get('OptionItemInformedIDs')
    ids.splice(ids.indexOf(socket.id), 1)
    session.put('OptionItemInformedIDs', ids)
  }
}

module.exports = OptionItemInformedController
