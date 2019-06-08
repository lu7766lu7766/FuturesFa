class User1000
{
  static get USER_OR_PASSWORD_ERROR() { return 1001 }

  static get USER_EXPIRED() { return 1002 }

  static get USER_NAME_IS_REQUIRED() { return 1003 }

  static get PASSWORD_IS_REQUIRED() { return 1004 }

  static get USER_ID_IS_REQUIRED() { return 1005 }

  static get NICK_NAME_TOO_LONG() { return 1006 }

  static get ROLE_NOT_FOUND() { return 1007 }

  static get EXPIRE_TIME_FORMAT_ERROR() { return 1008 }

  static get USER_NOT_FOUND() { return 1009 }

  static get PASSWORD_IS_TOO_SHORT() { return 1010 }

  static get NO_PERMISSION() { return 1011 }

  static get USER_EXISTS() { return 1012 }
}

module.exports = User1000
