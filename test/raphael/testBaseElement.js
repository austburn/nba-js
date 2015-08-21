var BaseElement, assert;

BaseElement = require('../../app/raphael/baseElement');
assert = require('assert');

describe('baseElement', function() {
    it('adjustAttributes returns adjusted object', function () {
        var element, adjusted;
        element = new BaseElement({
            attribute: 5
        });
        adjusted = element.adjustAttributes(2)
        assert.deepEqual(adjusted, {attribute: 10});
    });

    it('checkAttributes throws exception if there are the wrong number of attributes', function () {
        var element;
        element = new BaseElement({attribute: 'attribute1'});
        assert.throws(function () {
            element.checkAttributes();
        }, /Element does not have the expected number of keys\./);
    });

    it('checkAttributes throws exception if there are invalid attributes', function () {
        var element;
        element = new BaseElement({x: 0, y: 0, bad: 1});
        element.elementKeys = ['x', 'y', 'width'];
        assert.throws(function () {
            element.checkAttributes();
        }, /Unexpected attribute: 'bad'\./);
    });

    it('toRaphaelObject adds options', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 0, y: 0, width: 1});
        element.elementKeys = ['x', 'y', 'width'];
        raphaelObj = element.toRaphaelObject({'stroke-width': 2});
        assert.deepEqual(raphaelObj, {
            type: null,
            x: 0,
            y: 0,
            width: 1,
            'stroke-width': 2
        });
    });

    it('toRaphaelObject adjusts and adds options', function () {
        var element, raphaelObj;
        element = new BaseElement({x: 1, y: 2, width: 3});
        element.elementKeys = ['x', 'y', 'width'];
        raphaelObj = element.toRaphaelObject({ratio: 2, 'stroke-width': 2});
        assert.deepEqual(raphaelObj, {
            type: null,
            x: 2,
            y: 4,
            width: 6,
            'stroke-width': 2
        });
    });
});
