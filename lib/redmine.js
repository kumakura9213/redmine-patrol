'use strict';

const config = require('config');
const request = require('request');

/**
 * Redmineから指定ユーザが指定日に記載した作業記録の件数を取得する。
 *
 * @param {String} userId RedmineのユーザーID ※Redmineの画面右上のログイン名のところをクリックした先のページで確認できる。
 * @param {String} spentOn データが欲しい日(yyyy-mm-dd形式 ex:'2017-04-01')
 * @return {Promise}
 */
const getTimeEntriesCount = (userId, spentOn) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${config.redmine.url}/time_entries.json?key=${config.redmine.api_key}&user_id=${userId}&spent_on=${spentOn}`,
      json: true,
    };
    request.get(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body.total_count);
      } else {
        console.log(`error: ${response.statusCode}`);
        reject(0);
      }
    });
  });
}

module.exports = {
  getTimeEntriesCount,
};
