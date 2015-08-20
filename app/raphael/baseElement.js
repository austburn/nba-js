var BaseElement;

BaseElement = function (attributes, ratio) {
    this.attributes = attributes;
    this.checkAttributes(this.attributes);
    this.ratio = ratio;
};

BaseElement.prototype.checkAttributes = function (attributes) {
    if (typeof this.attributes !== 'object') {
        throw 'Attributes must be an object!';
    }
};

BaseElement.prototype.adjust = function () {
    throw 'Not implemented.';
};

module.exports = BaseElement;
