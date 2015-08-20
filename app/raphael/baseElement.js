var BaseElement;

BaseElement = function (attributes, ratio) {
    this.attributes = attributes;
    this.ratio = ratio;
};

BaseElement.prototype.checkAttributes = function () {
    if (typeof this.attributes !== 'object') {
        throw 'Attributes must be an object!';
    }
};

BaseElement.prototype.adjust = function () {
    throw 'Not implemented.';
};

module.exports = BaseElement;
