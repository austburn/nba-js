var BaseElement, Rectangle;

BaseElement = require('./baseElement');

Rectangle = function (attributes, ratio) {
    BaseElement.call(this, attributes, ratio);
};
Rectangle.prototype = Object.create(BaseElement.prototype);

Rectangle.prototype.checkAttributes = function () {
    var expectedKeys, attributeKeys;

    expectedKeys = ['x', 'y', 'width', 'height'].sort();
    attributeKeys = Object.keys(this.attributes).sort();

    if (attributeKeys.length !== expectedKeys.length) {
        throw 'Rectangle does not have the expected number of keys.';
    }

    expectedKeys.forEach(function (key, index) {
        if (key !== attributeKeys[index]) {
            throw 'Unexpected attribute: \'' + attributeKeys[index] + '\'.'
        }
    });
};

module.exports = Rectangle;
