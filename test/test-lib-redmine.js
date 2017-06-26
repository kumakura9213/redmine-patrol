'use strict';

require('dotenv').config({ path: './test/.env' });
const assert = require("power-assert");
const getTimeEntriesCount = require("./../lib/redmine.js").getTimeEntriesCount;

describe('lib/redmine.js', () => {

  it('getTimeEntriesCount return Promise', () => {
    assert(getTimeEntriesCount('180', '2017-06-20') instanceof Promise);
  });

  it(`getTimeEntriesCount's Promise return 0.`, () => {
    return getTimeEntriesCount('180', '2017-06-18').then((result) => {
      assert(0 === result);
    });
  });

  it(`getTimeEntriesCount's Promise return 1.`, () => {
    return getTimeEntriesCount('180', '2017-06-19').then((result) => {
      assert(1 === result);
    });
  });
});
