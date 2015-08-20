var BaseElement, assert;

BaseElement = require('../../app/raphael/baseElement');
assert = require('assert');

describe('baseElement', function() {
    it('throws an exception if attributes are not an object', function () {
        assert.throws(function () {
                new BaseElement('attributes')
        }, 'Attributes must be an object!');
    });

    it('does not throw exception for correct attributes', function () {
        assert.doesNotThrow(function () {
            new BaseElement({
                attribute: 'attribute1'
            })
        }, 'Attributes must be an object!');
    });

    it('throws not implemented exception', function () {
        var element;

        element = new BaseElement({
            attribute: 'attribute1'
        });

        assert.throws(element.adjust, 'Not implemented.');
    });
});
