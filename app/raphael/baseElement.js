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

    if (this.type === null) {
        throw 'Must define a type.';
    }

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

    try {
        this.checkAttributes();
    } catch (e) {
        throw e;
    }

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

    if (this.transformRaphaelObject !== null && typeof this.transformRaphaelObject === 'function') {
        raphael = this.transformRaphaelObject(raphael);
    }

    return raphael;
};

/**
    Essentially a hook for subclasses (currently only Path will use this).

    Reason: I like toRaphaelObject and don't want to dupe the code as the core
    functionality applies to the Raphael Path. The difference is that I have to
    transform the Path params into a path string.

    Based on: http://martinfowler.com/bliki/CallSuper.html
*/
BaseElement.prototype.transformRaphaelObject = null;

BaseElement.prototype.elementKeys = [];
BaseElement.prototype.type = null;

module.exports = BaseElement;
