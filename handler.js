'use strict';

process.env.TZ = 'Asia/Tokyo';

const moment = require('moment');
const config = require('config');
const isDayOff = require("./lib/date.js").isDayOff;
const getTimeEntriesCount = require("./lib/redmine.js").getTimeEntriesCount;
const sendMessageToChatwork = require("./lib/chatwork.js").sendMessageToChatwork;
const buildMessageForChatwork = require("./lib/chatwork.js").buildMessageForChatwork;
const success = require("./lib/response.js").success;
const failure = require("./lib/response.js").failure;

// *******************************
//           (・(ェ)・)
// *******************************
module.exports.report = (event, context, callback) => {
  console.log('## start ##');

  const today = new Date();

  // 実行日が土日・祝日の場合、処理しない。
  if (isDayOff(today)) {
    const message = 'Today is day off!!';
    console.log(message);
    console.log('## end ##');
    callback(null, failure(message, today));
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
        // メッセージの本文を組み立て、送信を行う。
        const message = buildMessageForChatwork(result);
        sendMessageToChatwork(message)
          .then(() => {
            console.log('## end ##');
            callback(null, success(message, today));
          });
      });
  }
};
