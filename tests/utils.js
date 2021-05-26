const tap = require("tap");
const utils = require("../src/utils.js");

tap.test("hello() returns string 'hello'", (t) => {
  t.equal(utils.hello(), "hello");
  t.end();
});
