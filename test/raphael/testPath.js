var Path, assert;

Path = require('../../app/raphael/path');
assert = require('assert');

describe('path', function() {
    it('checkAttributes does not throw exception for accepted attributes', function () {
        var path;
        path = new Path({x1: 0, y1: 0, x2: 1, y2: 1});
        assert.doesNotThrow(function () {
            path.checkAttributes();
        });
    });

    it('toRaphaelObject adds type', function () {
        var path, raphaelObj;
        path = new Path({x1: 0, y1: 0, x2: 1, y2: 1});
        raphaelObj = path.toRaphaelObject();
        assert.deepEqual(raphaelObj, {
            type: 'path',
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1
        });
    });
});
