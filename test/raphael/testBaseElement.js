var BaseElement, assert;

BaseElement = require('../../app/raphael/baseElement');
assert = require('assert');

describe('baseElement', function() {
    it('throws an exception if attributes are not an object', function () {
        var element;
        element = new BaseElement('attributes');
        assert.throws(function () {
            element.checkAttributes();
        }, /Attributes must be an object!/);
    });

    it('does not throw exception for correct attributes', function () {
        var element;
        element = new BaseElement({
            attribute: 'attribute1'
        });
        assert.doesNotThrow(function () {
            element.checkAttributes();
        }, /Attributes must be an object!/);
    });

    it('adjustAttributes returns adjusted object', function () {
        var element, adjusted;
        element = new BaseElement({
            attribute: 5
        });
        adjusted = element.adjustAttributes(2)
        assert.deepEqual(adjusted, {attribute: 10});
    });
});
