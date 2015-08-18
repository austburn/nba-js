var React, Canvas, CourtData, Court;

React = require('react');
Canvas = require('./raphael/canvas');

CourtData = {
    pixelsPerFoot: 10,
    width: 50,
    height: 60,
    court: [
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
        }
    ]
};


Court = React.createClass({
    render: function () {
        var data = this.adjustCourt(CourtData);

        return <Canvas data={ CourtData } />;
    }
});

module.exports = Court;
