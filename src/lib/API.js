export default class API
{
  constructor() {
    this.user = new (require('./Request/User').default)
    this.data = new (require('./Request/Data').default)
    this.sys = new (require('./Request/Sys').default)
  }
}