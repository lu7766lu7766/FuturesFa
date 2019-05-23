import Role from 'ApiConstants/Role'
import store from 'src/store'

export default class User
{
  constructor(info) {
    this._info = info
  }

  get info() {
    return this._info
      ? this._info
      : store.state.User.info
  }

  get userID() {
    return _(this.info).getVal('id', '')
  }

  get userName() {
    return _(this.info).getVal('user_name', '')
  }

  get nickName() {
    return _(this.info).getVal('nick_name', '')
  }

  get phone() {
    return _(this.info).getVal('phone', '')
  }

  get roleID() {
    return _(this.info).getVal('role_id', '')
  }

  get isAdmin() {
    return _.isEqual(this.roleID, Role.ADMIN_CODE)
  }
}