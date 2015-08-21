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

    it('toRaphaelObject uses transformRaphaelObject', function () {
        var path, raphaelObj;
        path = new Path({x1: 0, y1: 0, x2: 1, y2: 1});
        raphaelObj = path.toRaphaelObject();
        assert.deepEqual(raphaelObj, {
            type: 'path',
            path: 'M0,0L1,1'
        });
    });

    it('toRaphaelObject uses transformRaphaelObject and respects options', function () {
        var path, raphaelObj;
        path = new Path({x1: 1, y1: 1, x2: 2, y2: 2});
        raphaelObj = path.toRaphaelObject({ratio: 2, 'stroke-width': 2});
        assert.deepEqual(raphaelObj, {
            type: 'path',
            path: 'M2,2L4,4',
            'stroke-width': 2
        });
    });
});
