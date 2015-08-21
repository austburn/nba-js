var React, Canvas, CourtData, Utils, Rectangle,
    Circle, Path, Court;

React = require('react');
Canvas = require('../raphael/canvas');
Utils = require('./utils');
Rectangle = require('../raphael/rectangle');
Circle = require('../raphael/circle');
Path = require('../raphael/path');

CourtData = {
    pixelsPerFoot: 15,
    width: 50,
    height: 60,
    components: [
        // Boundaries
        new Rectangle({x: 0, y: 0, width: 50, height: 60}),
        // Backboard
        new Path({x1: 22, y1: 4, x2: 28, y2: 4}),
        // Hoop
        new Circle({cx: 25, cy: 4.75, r: .75})
    ]
};


Court = React.createClass({
    render: function () {
        var data = Utils.adjustCourtData(CourtData);

        return <Canvas data={ data } />;
    }
});

module.exports = Court;
