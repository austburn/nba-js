var utils, assert;

utils = require('../app/court/utils');
assert = require('assert');

describe('utils', function () {
    var testCourtData, adjustedCourtData;

    beforeEach(function () {
        testCourtData = {
            pixelsPerFoot: 2,
            width: 10,
            height: 15,
            court: [
                {
                    name: 'rectangle',
                    type: 'rect',
                    x: 1,
                    y: 1,
                    width: 5,
                    height: 5
                }
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
        assert.deepEqual(adjustedCourtData.court[0], {
            type: 'rect',
            x: 2,
            y: 2,
            width: 10,
            height: 10
        });
    });
});
