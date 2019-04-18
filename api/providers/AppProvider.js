const {ServiceProvider, ioc} = require('@adonisjs/fold')


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

    global._ = require('lodash')
    global.moment = require('moment')
    global.DB = use('Database')
    global.md5 = text => crypto.createHash('md5').update(text).digest('hex')

    global.App = class
    {
      static make(name) { return new (app.use(name)) }
    }

    global.ApiErrorException = app.use('App/Exceptions/ApiErrorException')

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

    global.Log = class Log
    {
      static get format() { return 'YYYY-MM-DD HH:mm:ss'}

      static info(msg) {
        Logger
          .transport('info')
          .info(`${moment().format(this.format)}: ${msg}`)
      }

      static error(msg) {
        Logger
          .transport('error')
          .error(`${moment().format(this.format)}: ${msg}`)
      }

      static test(msg) {
        Logger
          .transport('test')
          .error(`${moment().format(this.format)}: ${msg}`)
      }
    }
    global.dd = Logger.alert

    // Log.info('first message')
    // Log.error('first message')
  }
}

module.exports = AppProvider
