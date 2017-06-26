'use strict';

require('dotenv').config({ path: './test/.env' });
const assert = require("power-assert");
const sinon = require("sinon");
const isDayOff = require("./../lib/date.js").isDayOff;

describe('lib/date.js', () => {

  it('Sunday is day off', () => {
    const date = new Date();
    const stub = sinon.stub(date, 'getDay').returns(0);
    assert(true === isDayOff(date));
    stub.restore();
  });

  it('Saturday is day off', () => {
    const date = new Date();
    const stub = sinon.stub(date, 'getDay').returns(6);
    assert(true === isDayOff(date));
    stub.restore();
  });

  it('Thanksgiving is day off', () => {
    const date = new Date("2017-11-23T00:00:00.000Z");
    assert(true === isDayOff(date));
  });

  it('20170620 is not day off', () => {
    const date = new Date("2017-06-20T00:00:00.000Z");
    assert(false === isDayOff(date));
  });
});
