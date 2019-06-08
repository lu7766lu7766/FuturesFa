'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FuturesChipLog extends Model {
  static get table () {
    return 'futures_chip_log'
  }
}

module.exports = FuturesChipLog
