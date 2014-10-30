'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.shopify_sass = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    default: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default.scss.liquid');
        var expected = grunt.file.read('test/expected/default');
        test.equal(actual, expected, 'Content from test.scss should be in test.scss.liquid.');

        test.done();
    },
    multiple_src: function(test) {
      test.expect(1);

      var actual = grunt.file.read('tmp/multiple.scss.liquid');
      var expected = grunt.file.read('test/expected/multiple_src');
      test.equal(actual, expected, 'Content from both test.scss and test-2.scss should be in test.scss.liquid.');

      test.done();
    }
};
