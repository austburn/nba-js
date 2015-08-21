var BaseElement, Path;

BaseElement = require('./baseElement');

Path = function (attributes) {
    BaseElement.call(this, attributes);
};
Path.prototype = Object.create(BaseElement.prototype);

Path.prototype.transformRaphaelObject = function (raphaelObject) {
    raphaelObject.path = 'M' + raphaelObject.x1 + ',' + raphaelObject.y1 + 'L' + raphaelObject.x2 + ',' + raphaelObject.y2;
    delete raphaelObject.x1
    delete raphaelObject.y1
    delete raphaelObject.x2
    delete raphaelObject.y2

    return raphaelObject;
};

Path.prototype.type = 'path';
Path.prototype.elementKeys = ['x1', 'y1', 'x2', 'y2'];

module.exports = Path;
