'use strict';

require('dotenv').config({ path: './test/.env' });
const assert = require("power-assert");
const buildMessageForChatwork = require("./../lib/chatwork.js").buildMessageForChatwork;
const sendMessageToChatwork = require("./../lib/chatwork.js").sendMessageToChatwork;

describe('lib/chatwork.js', () => {

  it('buildMessageForChatwork return good message.', () => {
    assert('[preview id=155187287 ht=90]今日はみんなチケットに作業記録書いとったよ、さすがやねー' === buildMessageForChatwork([
      { "redmine_user_id": "1", "name": "くま", "chatwork_member_id": "1", "count": "1" },
      { "redmine_user_id": "2", "name": "しか", "chatwork_member_id": "2", "count": "2" }
    ]));
  });

  it('buildMessageForChatwork return bad message.', () => {
    assert(`[To:2] しかさん\n[preview id=155187287 ht=90]チケットに作業記録書いてー` === buildMessageForChatwork([
      { "redmine_user_id": "1", "name": "くま", "chatwork_member_id": "1", "count": "1" },
      { "redmine_user_id": "2", "name": "しか", "chatwork_member_id": "2", "count": "0" }
    ]));
  });

  it('buildMessageForChatwork return worst message.', () => {
    assert(`[To:1] くまさん\n[To:2] しかさん\n[preview id=155187287 ht=90]チケットに作業記録書いてー` === buildMessageForChatwork([
      { "redmine_user_id": "1", "name": "くま", "chatwork_member_id": "1", "count": "0" },
      { "redmine_user_id": "2", "name": "しか", "chatwork_member_id": "2", "count": "0" }
    ]));
  });

  it('sendMessageToChatwork return Promise', () => {
    assert(sendMessageToChatwork('sendMessageToChatwork return Promise') instanceof Promise);
  });
});
