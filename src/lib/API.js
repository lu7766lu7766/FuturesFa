export default class API
{
  constructor() {
    this.user = new (require('./Request/User').default)
  }
}