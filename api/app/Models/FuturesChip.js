'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FuturesChip extends Model {
  static get table () {
    return 'futures_chip'
  }
}

module.exports = FuturesChip
