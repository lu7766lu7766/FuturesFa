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
    // 1號在周三之前，則不用多做扣除，若是大於等於週三，則週數進行扣一
    const subCount = moment(moment().format('YYYY-MM-01')).day() < 3
      ? 0
      : 1

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
        ? (this.getWeekOfMonth(moment().day(3)) - subCount) == 0
          ? Math.ceil(moment().subtract(1, 'month').daysInMonth() / 7)
          : this.getWeekOfMonth(moment().day(3)) - subCount
        : this.getWeekOfMonth(moment().day(10)) - subCount,
      subWeek: isWeekSettleTime
        ? this.getWeekOfMonth(moment().day(10)) - subCount
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

  // 取得日期為該月第幾週
  getWeekOfMonth(date)
  {
    return Math.ceil(
      (moment(date).date() - (7 - moment(moment(date).format('YYYY-MM-01')).day())) / 7) + 1
  }
}

module.exports = DateService
