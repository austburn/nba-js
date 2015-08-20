var BaseElement;

BaseElement = function (attributes) {
    this.attributes = attributes;
};

BaseElement.prototype.checkAttributes = function () {
    if (typeof this.attributes !== 'object') {
        throw new Error('Attributes must be an object!');
    }
};

BaseElement.prototype.adjustAttributes = function (ratio) {
    var newObj;

    newObj = {};

    for (attribute in this.attributes) {
        newObj[attribute] = this.attributes[attribute] * ratio;
    }

    return newObj;
};

module.exports = BaseElement;
