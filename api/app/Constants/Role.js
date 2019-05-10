class RoleConstant
{
  static get ADMIN_CODE() { return 1 }

  static get USER_CODE() { return 2 }

  static get TESTER_CODE() { return 3 }

  static get ADMIN() { return 'admin' }

  static get USER() { return 'user' }

  static get TESTER() { return 'tester' }


  static enum() {
    return {
      [this.ADMIN_CODE]: this.ADMIN,
      [this.USER_CODE]: this.USER,
      [this.TESTER_CODE]: this.TESTER
    }
  }

  static validateString() {
    return [this.ADMIN_CODE, this.USER_CODE, this.TESTER_CODE].join(',')
  }

  static option()
  {
    return [
      {
        id: this.ADMIN_CODE,
        name: this.ADMIN
      },
      {
        id: this.USER_CODE,
        name: this.USER
      },
      {
        id: this.TESTER_CODE,
        name: this.TESTER
      }
    ]
  }
}

module.exports = RoleConstant
