var utils, Rectangle, Circle, Path, assert;

utils = require('../app/court/utils');
Rectangle = require('../app/raphael/rectangle');
Circle = require('../app/raphael/circle');
Path = require('../app/raphael/path');
assert = require('assert');

describe('utils', function () {
    var testCourtData, adjustedCourtData;

    beforeEach(function () {
        testCourtData = {
            pixelsPerFoot: 2,
            width: 10,
            height: 15,
            components: [
                new Rectangle({x: 1, y: 1, width: 5, height: 5}),
                new Path({x1: 0, y1: 0, x2: 5, y2: 5}),
                new Circle({cx: 5, cy: 5, r: 1})
            ]
        };

        adjustedCourtData = utils.adjustCourtData(testCourtData);
    });

    it('should adjust width', function () {
        assert.equal(20, adjustedCourtData.width);
    });

    it('should adjust height', function () {
        assert.equal(30, adjustedCourtData.height);
    });

    it('should adjust rectangles', function () {
        assert.deepEqual(adjustedCourtData.components[0], {
            type: 'rect',
            x: 2,
            y: 2,
            width: 10,
            height: 10,
            'stroke-width': 2
        });
    });

    it('should adjust and build paths', function () {
        assert.deepEqual(adjustedCourtData.components[1], {
            type: 'path',
            path: 'M0,0L10,10',
            'stroke-width': 2
        });
    });

    it('should adjust circles', function () {
        assert.deepEqual(adjustedCourtData.components[2], {
            type: 'circle',
            cx: 10,
            cy: 10,
            r: 2,
            'stroke-width': 2
        });
    });
});
