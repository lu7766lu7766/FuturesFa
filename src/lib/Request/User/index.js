import BaseRequest from '../BaseRequest'
import _config from './config'

export default class User extends BaseRequest
{
  get baseUrls() { return super.baseUrls.concat('user') }

  constructor() {
    super()
    this.config = _config
  }

  async login(data) {
    return await this.request('login', data)
  }

  async getInfo()
  {
    return await this.request('info')
  }

  async getList(data, options) {
    return await this.request('list', data, options)
  }

  async getListTotal(data, options) {
    return await this.request('listTotal', data, options)
  }

  async create(data, options) {
    return await this.request('create', data, options)
  }

  async createTester(data, options)
  {
    return await this.request('createTester', data, options)
  }

  async update(data, options) {
    return await this.request('update', data, options)
  }

  async updateMyself(data, options)
  {
    return await this.request('updateMyself', data, options)
  }

  async delete(data, options) {
    return await this.request('delete', data, options)
  }
}