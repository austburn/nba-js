var BaseElement, Rectangle;

BaseElement = require('./baseElement');

Rectangle = function (attributes) {
    BaseElement.call(this, attributes);
};
Rectangle.prototype = Object.create(BaseElement.prototype);

Rectangle.prototype.type = 'rect';
Rectangle.prototype.elementKeys = ['x', 'y', 'height', 'width'];

module.exports = Rectangle;
