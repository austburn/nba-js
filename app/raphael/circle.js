var BaseElement, Circle;

BaseElement = require('./baseElement');

Circle = function (attributes) {
    BaseElement.call(this, attributes);
};
Circle.prototype = Object.create(BaseElement.prototype);

Circle.prototype.type = 'circle';
Circle.prototype.elementKeys = ['cx', 'cy', 'r'];

module.exports = Circle;
