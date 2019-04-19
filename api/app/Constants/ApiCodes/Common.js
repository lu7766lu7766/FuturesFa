class Common
{
  static get OK() { return 0 }

  static get ERROR() { return -1 }

  static get ROUTE_NOT_FOUND() { return -2 }

  static get CREATE_FAIL() { return -3 }

  static get UPDATE_FAIL() { return -4 }

  static get TOO_MANY_ATTEMPTS() { return -5 }
}

module.exports = Common
