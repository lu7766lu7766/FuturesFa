import BaseRequest from '../BaseRequest'
import _config from './config'

export default class User extends BaseRequest
{
  constructor() {
    super()
    this.config = _config
  }

  async login(data) {
    return await this.request('login', data)
  }

  async register(data) {
    return await this.request('register', data)
  }

  async getUserInfo() {
    return await this.request('info')
  }

  async updateMyself(data, options) {
    return await this.request('updateMyself', data, options)
  }

  async transferPoint(data, options) {
    return await this.request('transferPoint', data, options)
  }

  async addPoint(data, options) {
    return await this.request('addPoint', data, options)
  }

  async getList(data, options) {
    return await this.request('list', data, options)
  }

  async getListTotal(data, options) {
    return await this.request('listTotal', data, options)
  }

  /**
   * for supplier
   */
  async create(data, options) {
    return await this.request('create', data, options)
  }

  async add(data, options) {
    return await this.request('add', data, options)
  }

  async update(data, options) {
    return await this.request('update', data, options)
  }

  async delete(data, options) {
    return await this.request('delete', data, options)
  }
}