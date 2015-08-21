var BaseElement, Rectangle;

BaseElement = require('./baseElement');

Rectangle = function (attributes) {
    BaseElement.call(this, attributes);
};
Rectangle.prototype = Object.create(BaseElement.prototype);

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
Rectangle.prototype.elementKeys = ['x', 'y', 'height', 'width'];

module.exports = Rectangle;
