const $ = require('axios');
const assert = require('assert');
const {describe} = require("mocha");

describe('Hello world', () => {
    it('Response is "Hello world!"', async () => {
      const response = await $.get('http://localhost:3030/hello');
      assert.equal(response.data, "Hello world!")
    })
  }
);
