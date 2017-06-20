'use strict';

/**
 * レスポンスを作成する。
 *
 * @param {Number} statusCode ステータスコード
 * @param {String} message メッセージ
 * @param {Date} date 処理対象日のDateObject
 * @return {Object} レスポンス
 */
const buildResponse = (statusCode, message, date) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
      date: date.toDateString(),
    }),
  };
}

/**
 * 成功時のレスポンスを作成する。
 *
 * @param {String} message メッセージ
 * @param {Date} date 処理対象日のDateObject
 * @return {Object} レスポンス
 */
const success = (message, date) => {
  return buildResponse(200, message, date);
}

/**
 * 失敗時のレスポンスを作成する。
 *
 * @param {String} message メッセージ
 * @param {Date} date 処理対象日のDateObject
 * @return {Object} レスポンス
 */
const failure = (message, date) => {
  return buildResponse(500, message, date);
}

module.exports = {
  success,
  failure,
};
