class SysService
{
  async getVersion()
  {
    return await DB.table('sys').select('version').first()
  }

  async updateVersion()
  {
    const version = Math.floor(Date.now() / 1000)
    return await DB.table('sys').update({
      version
    })
  }
}

module.exports = SysService
