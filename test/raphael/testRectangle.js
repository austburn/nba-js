var Rectangle, assert;

Rectangle = require('../../app/raphael/rectangle');
assert = require('assert');

describe('rectangle', function() {
    it('checkAttributes does not throw exception for accepted attributes', function () {
        var rect;
        rect = new Rectangle({x: 0, y: 0, width: 1, height: 2});
        assert.doesNotThrow(function () {
            rect.checkAttributes();
        });
    });

    it('toRaphaelObject adds type', function () {
        var rect, raphaelObj;
        rect = new Rectangle({x: 0, y: 0, width: 1, height: 2});
        raphaelObj = rect.toRaphaelObject();
        assert.deepEqual(raphaelObj, {
            type: 'rect',
            x: 0,
            y: 0,
            width: 1,
            height: 2
        });
    });
});
