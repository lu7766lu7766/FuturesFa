class RootConstant
{
  static get ANTHOR() { return 'lu7766' }

  static get ROOT() { return 'root' }

  static enum() {
    return [this.ANTHOR, this.ROOT]
  }
}

module.exports = RootConstant
