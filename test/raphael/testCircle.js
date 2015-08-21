var Circle, assert;

Circle = require('../../app/raphael/circle');
assert = require('assert');

describe('circle', function() {
    it('checkAttributes does not throw exception for accepted attributes', function () {
        var circle;
        circle = new Circle({cx: 2, cy: 2, r: 3});
        assert.doesNotThrow(function () {
            circle.checkAttributes();
        });
    });

    it('toRaphaelObject adds type', function () {
        var circle, raphaelObj;
        circle = new Circle({cx: 2, cy: 2, r: 3});
        raphaelObj = circle.toRaphaelObject();
        assert.deepEqual(raphaelObj, {
            type: 'circle',
            cx: 2,
            cy: 2,
            r: 3
        });
    });
});
