'use strict'

class DateService
{
  getDateInfo()
  {
    const monthSettleStartTime = this.getThirthWednesday().format('YYYY-MM-DD 15:00:00')
    const monthSettleEndTime = this.getForthWednesday().format('YYYY-MM-DD 13:45:00')
    const weekSettleStartTime = moment().day(3).format('YYYY-MM-DD 08:45:00')
    const weekSettleEndTime = moment().day(3).format('YYYY-MM-DD 13:45:00')
    const isMonthSettleTime = moment().isBetween(monthSettleStartTime, monthSettleEndTime, 'minute', '[]')
    const isWeekSettleTime = moment().isBetween(weekSettleStartTime, weekSettleEndTime, 'minute', '[]')
    const weekOfMonth = this.getWeekOfMonth()

    return {
      monthSettleStartTime,
      monthSettleEndTime,
      isMonthSettleTime,
      weekSettleStartTime,
      weekSettleEndTime,
      mainMonth: moment().isBefore(monthSettleEndTime, 'minute')
        ? moment().format('MM')
        : moment().add(1, 'months').format('MM'),
      subMonth: isMonthSettleTime
        ? moment().add(1, 'months').format('MM')
        : null,
      mainWeek: moment().isBefore(weekSettleEndTime, 'minute')
        ? weekOfMonth - 1
        : weekOfMonth,
      subWeek: isWeekSettleTime
        ? weekOfMonth
        : null
    }
  }

  // 三週三
  getThirthWednesday()
  {
    return moment(moment().format('YYYY-MM-01')).day(17)
  }

  // 四週三
  getForthWednesday()
  {
    return moment(moment().format('YYYY-MM-01')).day(24)
  }

  // 取得今天為第幾週
  getWeekOfMonth()
  {
    return Math.ceil(
      (moment().date() - (7 - moment(moment().format('YYYY-MM-01')).day())) / 7) + 1
  }
}

module.exports = DateService
