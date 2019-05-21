'use strict'
const dataService = App.make('Service/Data')

class SocketDataController {
  static option_item_informed = []
  static option_item_informed_time_block = null
  static option_chip_accumulation = []
  static option_history = []
  static txo = []
  static option_chip = []
  static option_chip_history = []
  static futures_chip = []
  static futures_chip_history = []
  static test = 2

  constructor ({ socket, request }) {
    this.test++
    console.log(this.test, SocketDataController.test)
    this.socket = socket
    this.request = request
    // console.log('a new subscription for news topic')
  }

  async onGetOptionItemInformed()
  {
    if (!SocketDataController.option_item_informed_time_block
      || (SocketDataController.option_item_informed_time_block
        && SocketDataController.option_item_informed_time_block.diff(moment(), 'secs') < 0))
    {
      SocketDataController.option_item_informed = await dataService.getOptionItemInformed()
      SocketDataController.option_item_informed_time_block = moment().add(5, 'secs')
    }
    this.socket.emit('getItemInformed', SocketDataController.option_item_informed)
  }

  onClose () {
    // same as: socket.on('close')
  }

  onError () {
    // same as: socket.on('error')
  }
}

module.exports = SocketDataController
