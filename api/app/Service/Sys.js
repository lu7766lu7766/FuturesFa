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

  async getIsMonthItemEndWeek()
  {
    return !!(await DB.table('sys').select('is_month_item_end_week').first()).is_month_item_end_week
  }
}

module.exports = SysService
