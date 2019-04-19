'use strict'

class TransferController {
  message(ctx) {
    Log.test(JSON.stringify(ctx.request.all()))
  }
}

module.exports = TransferController
