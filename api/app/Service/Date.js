'use strict'

const dataService = App.make('Service/Data')

class DateService
{
  getDateInfo({request})
  {
    const dateTime = request.input('dateTime')

    const monthSettleStartTime = this.getThirthWednesday(moment(dateTime)).format('YYYY-MM-DD 15:00:00')
    const monthSettleEndTime = this.getForthWednesday(moment(dateTime)).format('YYYY-MM-DD 13:45:00')
    const weekSettleStartTime = moment(dateTime).day(3).format('YYYY-MM-DD 08:45:00')
    const weekSettleEndTime = moment(dateTime).day(3).format('YYYY-MM-DD 13:45:00')
    const isMonthSettleTime = moment(dateTime).isBetween(monthSettleStartTime, monthSettleEndTime, 'minute', '[]')
    // const isWeekSettleTime = moment(dateTime).isBetween(weekSettleStartTime, weekSettleEndTime, 'minute', '[]')
    // 1號在周三之前，則不用多做扣除，若是大於等於週三，則週數進行扣一
    const subCount = moment(moment(dateTime).format('YYYY-MM-01')).day() < 3
      ? 0
      : 1
    // 開盤日
    let date = moment(dateTime).isBefore(moment(dateTime).format('YYYY-MM-DD 14:00:00'))
      ? moment(dateTime).subtract(1, 'days')
      : moment(dateTime)
    while (!dataService.isDataTransferTime() && (date.day() < 1 || date.day > 5))
    {
      date = date.subtract(1, 'days')
    }

    const thisWednesday = moment(dateTime).day(3)
    const nextWednesday = moment(dateTime).day(10)

    return {
      dateTime,
      date: date.getDate(),
      monthSettleStartTime,
      monthSettleEndTime,
      // 是否為月結週
      isMonthSettleTime,
      // 本週的結算開始時間
      weekSettleStartTime,
      // 本週的結算結束時間
      weekSettleEndTime,
      // 周選頁的月份
      mainMonth: moment().isBefore(weekSettleEndTime, 'minute')
        ? thisWednesday.format('MM')
        : nextWednesday.format('MM'),
      // 月選頁的月份
      subMonth: moment(dateTime).isBefore(monthSettleStartTime, 'minute')
        ? moment(dateTime).format('MM')
        : moment(dateTime).add(1, 'months').format('MM'),
      // 週選的週數
      mainWeek: moment(dateTime).isBefore(weekSettleEndTime, 'minute')
        ? (this.getWeeksOfMonth(thisWednesday) - subCount) === 0
          ? Math.ceil(moment(dateTime).subtract(1, 'month').daysInMonth() / 7)
          : this.getWeeksOfMonth(thisWednesday) - subCount
        : this.getWeeksOfMonth(nextWednesday) - subCount,
      // subWeek: isWeekSettleTime
      //   ? this.getWeeksOfMonth(moment(dateTime).day(10)) - subCount
      //   : null
    }
  }

  // 三週三
  getThirthWednesday(targetMoment)
  {
    return moment(targetMoment.format('YYYY-MM-01')).day(17)
  }

  // 四週三
  getForthWednesday(targetMoment)
  {
    return moment(targetMoment.format('YYYY-MM-01')).day(24)
  }

  // 取得日期為該月第幾週
  getWeeksOfMonth(date)
  {
    return Math.ceil(
      (moment(date).date() - (7 - moment(moment(date).format('YYYY-MM-01')).day())) / 7) + 1
  }
}

module.exports = DateService
