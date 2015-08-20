var BaseElement, Rectangle;

BaseElement = require('./baseElement');

Rectangle = function (attributes) {
    BaseElement.call(this, attributes);
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

Rectangle.prototype.toRaphaelObject = function (opts) {
    var raphael, opts;

    opts = opts || {};
    if (opts.hasOwnProperty('ratio')) {
        raphael = this.adjustAttributes(opts.ratio);
        delete opts['ratio']
    } else {
        raphael = this.attributes;
    }

    raphael.type = this.type;

    for (opt in opts) {
        raphael[opt] = opts[opt];
    }

    return raphael;
}

Rectangle.prototype.type = 'rect';

module.exports = Rectangle;
