var Circle, assert;

Circle = require('../../app/raphael/circle');
assert = require('assert');

describe('circle', function() {
    it('checkAttributes does not throw exception for accepted attributes', function () {
        var rect;
        rect = new Circle({cx: 2, cy: 2, r: 3});
        assert.doesNotThrow(function () {
            rect.checkAttributes();
        });
    });

    it('toRaphaelObject adds type', function () {
        var rect, raphaelObj;
        rect = new Circle({cx: 2, cy: 2, r: 3});
        raphaelObj = rect.toRaphaelObject();
        assert.deepEqual(raphaelObj, {
            type: 'circle',
            cx: 2,
            cy: 2,
            r: 3
        });
    });
});
