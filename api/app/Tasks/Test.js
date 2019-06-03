'use strict'

const Task = use('Task')

class Test extends Task
{
  static get schedule()
  {
    return '0 0 0 * * *'
  }

  async handle()
  {
    console.log('Task Test handle')
  }
}

module.exports = Test
