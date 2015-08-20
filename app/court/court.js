var React, Canvas, CourtData, Utils, Rectangle, Court;

React = require('react');
Canvas = require('../raphael/canvas');
Utils = require('./utils');
Rectangle = require('../raphael/rectangle');
CourtData = {
    pixelsPerFoot: 15,
    width: 50,
    height: 60,
    components: [
        new Rectangle({x: 0, y: 0, width: 50, height: 60}),
        {
            /** Backboard */
            type: 'path',
            x1: 22,
            y1: 4,
            x2: 28,
            y2: 4
        },
        {
            /** Hoop */
            type: 'circle',
            cx: 25,
            cy: 4.75,
            r: .75
        }
    ]
};


Court = React.createClass({
    render: function () {
        var data = Utils.adjustCourtData(CourtData);

        return <Canvas data={ data } />;
    }
});

module.exports = Court;
