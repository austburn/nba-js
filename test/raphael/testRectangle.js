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

    it('toRaphaelObject adds options', function () {
        var rect, raphaelObj;
        rect = new Rectangle({x: 0, y: 0, width: 1, height: 2});
        raphaelObj = rect.toRaphaelObject({'stroke-width': 2});
        assert.deepEqual(raphaelObj, {
            type: 'rect',
            x: 0,
            y: 0,
            width: 1,
            height: 2,
            'stroke-width': 2
        });
    });

    it('toRaphaelObject adjusts and adds options', function () {
        var rect, raphaelObj;
        rect = new Rectangle({x: 1, y: 2, width: 3, height: 4});
        raphaelObj = rect.toRaphaelObject({ratio: 2, 'stroke-width': 2});
        assert.deepEqual(raphaelObj, {
            type: 'rect',
            x: 2,
            y: 4,
            width: 6,
            height: 8,
            'stroke-width': 2
        });
    });
});
