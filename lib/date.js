'use strict';

const japaneseHolidays = require('japanese-holidays');

/**
 * 休みの日かどうかを判断する。
 *
 * @param {Date} date 休みの日かどうか確認したい日
 * @return {bool} true:休みの日、false:休みの日じゃない
 */
const isDayOff = (date) => {
  if ([0, 6].indexOf(date.getDay()) >= 0 || japaneseHolidays.isHoliday(date)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isDayOff,
};
