'use strict'

class SocketDataController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('a new subscription for news topic')
  }

  onMessage (message) {
    // this.socket.broadcastToAll('message', message)
    console.log(message)
  }

  onClose () {
    // same as: socket.on('close')
  }

  onError () {
    // same as: socket.on('error')
  }
}

module.exports = SocketDataController
