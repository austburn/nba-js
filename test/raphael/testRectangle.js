var Rectangle, assert;

Rectangle = require('../../app/raphael/rectangle');
assert = require('assert');

describe('rectangle', function() {
    it('checkAttributes throws exception if there are the wrong number of attributes', function () {
        var rect;
        rect = new Rectangle({attribute: 'attribute1'});
        assert.throws(function () {
            rect.checkAttributes();
        }, /Rectangle does not have the expected number of keys\./);
    });

    it('checkAttributes throws exception if there are invalid attributes', function () {
        var rect;
        rect = new Rectangle({x: 0, y: 0, width: 1, bad: 1});
        assert.throws(function () {
            rect.checkAttributes();
        }, /Unexpected attribute: 'bad'\./);
    });
});
