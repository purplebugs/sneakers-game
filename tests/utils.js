const tap = require("tap");
const utils = require("../src/utils.js");

tap.test("hello() returns string 'hello'", (t) => {
  t.equal(utils.hello(), "hello");
  t.end();
});

tap.test(
  "compare(sneakerA, sneakerB, userSelectedSneaker) returns object",
  (t) => {
    t.same(utils.compare("abc", "def", "abc"), {
      highest: "1deddc2f-eb10-4a58-b0c6-5880e68e084d",
      lowest: "098a95ad-6b19-4e95-8955-d1fa7d4a087f",
      equal: false,
    });
    t.end();
  }
);
