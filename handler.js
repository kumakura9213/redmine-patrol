'use strict';

process.env.TZ = 'Asia/Tokyo';

const moment = require('moment');
const config = require('config');
const japaneseHolidays = require('japanese-holidays');

/**
 * Redmineから指定ユーザが指定日に記載した作業記録の件数を取得する。
 *
 * @param {String} userId RedmineのユーザーID ※Redmineの画面右上のログイン名のところをクリックした先のページで確認できる。
 * @param {String} spentOn データが欲しい日(yyyy-mm-dd形式 ex:'2017-04-01')
 * @return {Promise}
 */
function getTimeEntriesCount(userId, spentOn) {
  return new Promise((resolve, reject) => {
    const request = require('request');
    const options = {
      url: `${config.redmine.url}/time_entries.json?key=${config.redmine.api_key}&user_id=${userId}&spent_on=${spentOn}`,
      json: true,
    };
    request.get(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(`user_id:${userId} => ${JSON.stringify(body)}`);
        resolve(body.total_count);
      } else {
        console.log(`error: ${response.statusCode}`);
        reject(0);
      }
    });
  });
}

/**
 * Chatworkにメッセージを送る。
 *
 * @param {String} body メッセージ本文
 * @return {Promise}
 */
function sendMessageToChatwork(body) {
  return new Promise((resolve, reject) => {
    const request = require('request');
    const options = {
      url: `https://api.chatwork.com/v2/rooms/${config.chatwork.target_room_id}/messages`,
      headers: {
        'X-ChatWorkToken': config.chatwork.api_token
      },
      form: {
        body: body
      },
      json: true,
    };
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve();
      } else {
        console.log(`error: ${response.statusCode}`);
        reject();
      }
    });
  });
}

// *******************************
//           (・(ェ)・)
// *******************************
module.exports.report = (event, context, callback) => {
  console.log('## start ##');

  const today = new Date();
  const holiday = japaneseHolidays.isHoliday(today);

  // 実行日が土日・祝日の場合、処理しない。
  if ([0, 6].indexOf(today.getDay()) >= 0 || holiday) {
    const message = holiday ? `Today is '${holiday}'!!` : `Today is ${moment().format('dddd')}!!`;
    console.log(message);
    console.log('## end ##');
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: message,
        date: today,
      }),
    });
  } else {
    console.log(`Today is weekday...`);

    // Redmineから各メンバーの今日の記録を取得し、チャットワークに結果を報告する。
    Promise.all(config.members.map((member) => {
        return getTimeEntriesCount(member.redmine_user_id, moment().format('YYYY-MM-DD'))
          .then((count) => {
            member.count = count;
            return member;
          });
      }))
      .then((result) => {

        // 今日まだチケットを記入していない人達をTo:にするためのメッセージを組み立てる。
        const toMessages = [];
        result.forEach((member) => {
          if (member.count == 0) {
            toMessages.push(`[To:${member.chatwork_member_id}] ${member.name}さん`);
          }
        });

        // メッセージの本文を組み立て、送信を行う。
        let message = '';
        if (toMessages.length == 0) {
          message = `` +
            `[preview id=155187287 ht=90]今日はみんなチケットに作業記録書いとったよ、さすがやねー`;
        } else {
          message = `` +
            `${toMessages.join('\n')}\n` +
            `[preview id=155187287 ht=90]チケットに作業記録書いてー`;
        }
        sendMessageToChatwork(message)
          .then(() => {
            console.log('## end ##');
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                message: message,
                date: today,
              }),
            });
          });
      });
  }
};
