var BaseElement, Path;

BaseElement = require('./baseElement');

Path = function (attributes) {
    BaseElement.call(this, attributes);
};
Path.prototype = Object.create(BaseElement.prototype);

Path.prototype.type = 'path';
Path.prototype.elementKeys = ['x1', 'y1', 'x2', 'y2'];

module.exports = Path;
