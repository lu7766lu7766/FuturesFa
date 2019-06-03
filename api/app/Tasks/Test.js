'use strict'

const Task = use('Task')

class Test extends Task {
  static get schedule () {
    return '* * * * * *'
  }

  async handle () {
    this.info('Task Test handle')
  }
}

module.exports = Test
