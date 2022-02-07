'use strict'

class DateService
{
  static inTheseDay(dateTime, date)
  {
    return _.some(date, (holiday) =>
    {
      return moment(dateTime).isBetween(
        moment(holiday).getNormalSettleTime(), //.format('YYYY-MM-DD 14:00:00'),
        moment(holiday).add(1, 'days').getNormalStartTime()) //.format('YYYY-MM-DD 15:00:00'))
    })
  }

  static async getWednesdayContinueHoliday()
  {
    return _.map(await DB.table('wednesday_continue_holiday').select('date'), 'date')
  }

  static async getSpecialWeekSettleDate()
  {
    return _.map(await DB.table('sys').select('special_week_settle_date'), 'special_week_settle_date')
  }

  async getDateInfo({request})
  {
    let dateTime = moment(request.input('dateTime'))

    // 若遇到週三為休市，會改延遲結算，所以會持續扣除天數
    while (DateService.inTheseDay(dateTime, await DateService.getWednesdayContinueHoliday()))
    {
      dateTime = moment(dateTime).subtract(1, 'days').getDateTime()
    }

    let monthSettleStartTime, monthSettleEndTime
    const is_month_item_end_week = (await DB.table('sys').select('is_month_item_end_week').first()).is_month_item_end_week
    if (is_month_item_end_week != 0)
    {
      let startMethod, endMethod
      switch(is_month_item_end_week) {
        case 1:
          startMethod = this.getFirstWednesday
          endMethod = this.getSecondWednesday
          break
        case 2:
          startMethod = this.getSecondWednesday
          endMethod = this.getThirdWednesday
          break
        case 3:
          startMethod = this.getThirdWednesday
          endMethod = this.getFourthWednesday
          break
      }
      monthSettleStartTime = startMethod(moment(dateTime)).getNormalStartTime() //.format('YYYY-MM-DD 15:00:00')
      monthSettleEndTime = endMethod(moment(dateTime)).getNormalEndTime() //.format('YYYY-MM-DD 13:45:00')
    }
    else if (Math.ceil(this.getThirdWednesday(moment(dateTime)).date() / 7) > 2)
    {
      monthSettleStartTime = this.getSecondWednesday(moment(dateTime)).getNormalStartTime() //.format('YYYY-MM-DD 15:00:00')
      monthSettleEndTime = this.getThirdWednesday(moment(dateTime)).getNormalEndTime() //.format('YYYY-MM-DD 13:45:00')
    }
    else
    {
      monthSettleStartTime = this.getThirdWednesday(moment(dateTime)).getNormalStartTime() //.format('YYYY-MM-DD 15:00:00')
      monthSettleEndTime = this.getFourthWednesday(moment(dateTime)).getNormalEndTime() //.format('YYYY-MM-DD 13:45:00')
    }
    let weekSettleStartTime 
    let weekSettleEndTime
    // 特殊週結日
    const specialWeekSettleDate = await DateService.getSpecialWeekSettleDate()
    if (specialWeekSettleDate) { // && moment(dateTime).isBefore(moment(specialWeekSettleDate).getNormalEndTime())
      weekSettleStartTime = moment(specialWeekSettleDate).getMorningStartTime()
      weekSettleEndTime = moment(specialWeekSettleDate).getNormalEndTime()
    } else {
      weekSettleStartTime = moment(dateTime).day(3).getMorningStartTime() //.format('YYYY-MM-DD 08:45:00')
      weekSettleEndTime = moment(dateTime).day(3).getNormalEndTime() //.format('YYYY-MM-DD 13:45:00')
    }
    
    const isMonthSettleTime = moment(dateTime).isBetween(monthSettleStartTime, monthSettleEndTime, 'minute', '[]')
    // const isWeekSettleTime = moment(moment(dateTime)).isBetween(weekSettleStartTime, weekSettleEndTime, 'minute', '[]')
    // 開盤日
    let date = moment(dateTime).isBefore(moment(dateTime).getNormalSettleTime()) //.format('YYYY-MM-DD 14:00:00'))
      ? moment(dateTime).subtract(1, 'days')
      : moment(dateTime)
    while (!this.isDataTransferTime() && (date.day() < 1 || date.day > 5))
    {
      date = date.subtract(1, 'days')
    }

    const thisWednesday = moment(dateTime).day(3)
    const nextWednesday = moment(dateTime).day(10)

    return {
      dateTime: moment(dateTime).getDateTime(),
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
      mainMonth: moment(dateTime).isBefore(weekSettleEndTime, 'minute')
        ? thisWednesday.format('MM')
        : nextWednesday.format('MM'),
      // 月選頁的月份
      subMonth: moment(dateTime).isBefore(monthSettleStartTime, 'minute')
        ? moment(dateTime).format('MM')
        : moment(dateTime).add(1, 'months').format('MM'),
      // 週選的週數
      mainWeek: moment(dateTime).isBefore(weekSettleEndTime, 'minute')
        ? this.getWeekOfMonth(thisWednesday)
        : this.getWeekOfMonth(nextWednesday),
    }
  }

  // 一週三
  getFirstWednesday(targetMoment)
  {
    return moment(targetMoment.format('YYYY-MM-01')).day(3)
  }

  // 二週三
  getSecondWednesday(targetMoment)
  {
    return moment(targetMoment.format('YYYY-MM-01')).day(10)
  }

  // 三週三
  getThirdWednesday(targetMoment)
  {
    return moment(targetMoment.format('YYYY-MM-01')).day(17)
  }

  // 四週三
  getFourthWednesday(targetMoment)
  {
    return moment(targetMoment.format('YYYY-MM-01')).day(24)
  }

  // 取得該日期除以七無條件進位
  getWeekOfMonth(date)
  {
    // 取得日期為該月第幾週
    // return Math.ceil(
    //   (moment(date).date() - (7 - moment(moment(date).format('YYYY-MM-01')).day())) / 7) + 1
    return Math.ceil(date.date() / 7)
  }

  isDataTransferTime(time)
  {
    const now = moment(time)
    switch (now.format('e'))
    {
      case '1':
        return now.isBetween(now.format('YYYY-MM-DD 08:45:00'), now.format('YYYY-MM-DD 13:45:10')) ||
          now.isBetween(now.format('YYYY-MM-DD 15:00:00'), now.format('YYYY-MM-DD 23:59:59'))
      case '2':
      case '3':
      case '4':
      case '5':
        return now.isBetween(now.format('YYYY-MM-DD 00:00:00'), now.format('YYYY-MM-DD 05:00:10')) ||
          now.isBetween(now.format('YYYY-MM-DD 08:45:00'), now.format('YYYY-MM-DD 13:45:10')) ||
          now.isBetween(now.format('YYYY-MM-DD 15:00:00'), now.format('YYYY-MM-DD 23:59:59'))
        break
      case '6':
        return now.isBetween(now.format('YYYY-MM-DD 00:00:00'), now.format('YYYY-MM-DD 05:00:10'))
        break
      default:
        return false
        break
    }
  }

  getTransferEndTime(time)
  {
    const now = moment(time)
    switch (now.format('e'))
    {
      case '1':
      case '2':
      case '3':
      case '4':
        return now.isBefore(now.format('YYYY-MM-DD 13:45:00'))
          ? now.format('YYYY-MM-DD 13:45:00')
          : now.add(1, 'days').format('YYYY-MM-DD 13:45:00')
        return
        break
      case '5':
        return now.isBefore(now.format('YYYY-MM-DD 13:45:00'))
          ? now.format('YYYY-MM-DD 13:45:00')
          : now.add(1, 'days').format('YYYY-MM-DD 05:00:00')
        break
      case '6':
        return now.format('YYYY-MM-DD 05:00:00')
        break
      case '0':
      case '7':
        return now.add(1, 'days').format('YYYY-MM-DD 13:45:00')
        // default:
        //   return now.getDateTime()
        break
    }
  }

  getTransferStartTime(time)
  {
    const now = moment(time)
    switch (now.format('e'))
    {
      case '1':
        return now.isBefore(now.format('YYYY-MM-DD 13:45:00'))
          ? now.format('YYYY-MM-DD 08:45:00')
          : now.format('YYYY-MM-DD 15:00:00')
        break
      case '2':
      case '3':
      case '4':
      case '5':
        return now.isBefore(now.format('YYYY-MM-DD 13:45:00'))
          ? now.subtract(1, 'days').format('YYYY-MM-DD 15:00:00')
          : now.format('YYYY-MM-DD 15:00:00')
        break
      case '6':
        return now.subtract(1, 'days').format('YYYY-MM-DD 15:00:00')
        break
      case '0':
      case '7':
        // return now.subtract(2, 'days').format('YYYY-MM-DD 05:00:00')
        return now.getDateTime()
        break
    }
  }

  isRestTime(time)
  {
    const now = moment(time)
    switch (now.format('e'))
    {
      case '6':
        return now.isAfter(now.format('YYYY-MM-DD 13:45:00'))
      case '0':
      case '7':
        return true
      case '1':
        now.isBefore(now.format('YYYY-MM-DD 08:45:00'))
        break
    }

  }
}

module.exports = DateService
