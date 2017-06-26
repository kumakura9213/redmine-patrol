'use strict';

const request = require('request');

/**
 * Chatworkに送信するメッセージを組み立てる。
 *
 * @param {Array} members 会員情報
 * @return {String} メッセージ本文
 */
const buildMessageForChatwork = (members) => {
  const toMessages = [];
  members.forEach((member) => {
    if (member.count == 0) {
      toMessages.push(`[To:${member.chatwork_member_id}] ${member.name}さん`);
    }
  });

  // メッセージの本文を組み立てる。
  if (toMessages.length == 0) {
    return `[preview id=155187287 ht=90]今日はみんなチケットに作業記録書いとったよ、さすがやねー`;
  } else {
    return `${toMessages.join('\n')}\n[preview id=155187287 ht=90]チケットに作業記録書いてー`;
  }
}

/**
 * Chatworkにメッセージを送る。
 *
 * @param {String} body メッセージ本文
 * @return {Promise}
 */
const sendMessageToChatwork = (body) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.chatwork.com/v2/rooms/${process.env.CHATWORK_TARGET_ROOM_ID}/messages`,
      headers: {
        'X-ChatWorkToken': process.env.CHATWORK_API_TOKEN
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

module.exports = {
  buildMessageForChatwork,
  sendMessageToChatwork,
};
