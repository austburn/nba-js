var React, Canvas, CourtData, Utils, Court;

React = require('react');
Canvas = require('../raphael/canvas');
Utils = require('./utils')
CourtData = {
    pixelsPerFoot: 15,
    width: 50,
    height: 60,
    components: [
        {
            name: 'boundaries',
            type: 'rect',
            x: 0,
            y: 0,
            width: 50,
            height: 60
        },
        {
            name: 'backboard',
            type: 'path',
            x1: 22,
            y1: 4,
            x2: 28,
            y2: 4
        },
        {
            name: 'hoop',
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
