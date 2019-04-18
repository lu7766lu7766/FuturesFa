export default class Request
{
  constructor() {
    this.user = new (require('./ApiRequest/User').default)
    this.bet = new (require('./ApiRequest/Bet').default)
    this.report = new (require('./ApiRequest/Report').default)
    this.sms = new (require('./ApiRequest/Sms').default)
  }
}