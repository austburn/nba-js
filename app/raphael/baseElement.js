var BaseElement;

BaseElement = function (attributes) {
    this.attributes = attributes;
};

BaseElement.prototype.adjustAttributes = function (ratio) {
    var newObj;

    newObj = {};

    for (attribute in this.attributes) {
        newObj[attribute] = this.attributes[attribute] * ratio;
    }

    return newObj;
};

BaseElement.prototype.checkAttributes = function () {
    var expectedKeys, attributeKeys;

    expectedKeys = this.elementKeys.sort();
    attributeKeys = Object.keys(this.attributes).sort();

    if (attributeKeys.length !== expectedKeys.length) {
        throw 'Element does not have the expected number of keys.';
    }

    expectedKeys.forEach(function (key, index) {
        if (key !== attributeKeys[index]) {
            throw 'Unexpected attribute: \'' + attributeKeys[index] + '\'.'
        }
    });
};

BaseElement.prototype.toRaphaelObject = function (opts) {
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
};

BaseElement.prototype.elementKeys = [];
BaseElement.prototype.type = null;

module.exports = BaseElement;
