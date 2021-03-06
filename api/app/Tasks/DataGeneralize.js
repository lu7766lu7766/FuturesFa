'use strict'

const Task = use('Task')
const dataService = App.make('Service/Data')

class DataGeneralize extends Task {
  // do data generalize every 14:00 Pm
  // 如果不定義分鐘跟秒數，會是某小時的每秒鐘都執行
  static get schedule () {
    return '0 0 7,14 * * 1-6'
    // return '*/1 * * * * *'
  }

  async handle () {
    console.log('Task DataGeneralize handle')
    await dataService.generalizeDatas()
    await dataService.clearOlderDatas()
  }
}

module.exports = DataGeneralize
