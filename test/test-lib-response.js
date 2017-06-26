'use strict';

require('dotenv').config({ path: './test/.env' });
const assert = require("power-assert");
const sinon = require("sinon");
const success = require("./../lib/response.js").success;
const failure = require("./../lib/response.js").failure;

describe('lib/response.js', () => {

  it('success return 200', () => {
    const date = new Date();
    const stub = sinon.stub(date, 'toDateString').returns('Tue Jun 20 2017');
    const expected = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'good!!',
        date: 'Tue Jun 20 2017',
      }),
    };
    assert(JSON.stringify(expected) === JSON.stringify(success('good!!', date)));
    stub.restore();
  });

  it('failure return 500', () => {
    const date = new Date();
    const stub = sinon.stub(date, 'toDateString').returns('Tue Jun 20 2017');
    const expected = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'bad!!',
        date: 'Tue Jun 20 2017',
      }),
    };
    assert(JSON.stringify(expected) === JSON.stringify(failure('bad!!', date)));
    stub.restore();
  });
});
