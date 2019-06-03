const {ServiceProvider} = require('@adonisjs/fold')

var crypto = require('crypto')

class AppProvider extends ServiceProvider
{
  register() {

  }

  /**
   * my global function
   */
  async boot() {
    const Env = use('Env')
    const app = this.app
    const Logger = app.use('Logger')

    // 全域lodash物件
    global._ = require('lodash')
    // 全域moment物件
    global.moment = require('moment')
    // 增加moment getDateTime方法
    moment.fn.getDateTime = function ()
    {
      return this.format('YYYY-MM-DD HH:mm:ss')
    }
    // 增加moment getDate方法
    moment.fn.getDate = function ()
    {
      return this.format('YYYY-MM-DD')
    }
    
    // 全域DB物件
    global.DB = use('Database')
    // 測試環境環傳sql
    // global.querys = []
    if (Env.get('DB_SQL_CONSOLE', 'false') === 'true')
    {
      DB.on('query', query => console.log(_.pick(query, ['bindings', 'sql'])))
      // DB.on('query', _query => global.querys.push(_.pick(_query, ['bindings', 'sql'])))
    }

    // 全域md5方法
    global.md5 = text => crypto.createHash('md5').update(text).digest('hex')

    // App.make方法
    global.App = class
    {
      static make(name) { return new (app.use(name)) }
    }

    // ApiErrorException 全域變數
    global.ApiErrorException = app.use('App/Exceptions/ApiErrorException')

    // 取得初始id
    global.GetIncrement = async table => (await DB.table('INFORMATION_SCHEMA.TABLES').select('AUTO_INCREMENT')
      .where('TABLE_SCHEMA', Env.get('DB_DATABASE'))
      .where('TABLE_NAME', table)
      .first()).AUTO_INCREMENT

    // mkdir tmp folder at rootPath, fot logger file
    const mkdirp = require('mkdirp')
    const path = require('path')
    const Helpers = use('Helpers')
    mkdirp(path.join(Helpers.appRoot(), 'tmp'), function (err)
    {
    })

    // 全域Log物件
    global.Log = class Log
    {
      static info(msg) {
        Logger
          .transport('info')
          .info(`${moment().getDateTime()}: ${msg}`)
      }

      static error(msg) {
        Logger
          .transport('error')
          .error(`${moment().getDateTime()}: ${msg}`)
      }

      static test(msg) {
        Logger
          .transport('test')
          .error(`${moment().getDateTime()}: ${msg}`)
      }
    }
    // 全域dd方法
    global.dd = Logger.alert

    // Log.info('first message')
    // Log.error('first message')
  }
}

module.exports = AppProvider
