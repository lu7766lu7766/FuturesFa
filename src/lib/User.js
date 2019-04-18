import Role from 'constants/Role'
import store from 'src/store'

export default class User
{
  get anthor() {return 'lu7766'}

  get admin() { return 'root'}

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

  get point() {
    return _(this.info).getVal('point', 0)
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

  get isSupplier() {
    return _.isEqual(this.roleID, Role.SUPPLIER_CODE)
  }

  get isManager() {
    return this.isAdmin || this.isSupplier
  }

  get isGamer() {
    return _.isEqual(this.roleID, Role.GAMER_CODE)
  }
}