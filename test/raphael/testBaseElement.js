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

    it('throws not implemented exception', function () {
        var element;
        element = new BaseElement({
            attribute: 'attribute1'
        });
        assert.throws(element.adjust, /Not implemented\./);
    });
});
