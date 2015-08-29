var React, Canvas, CourtData, opts, Michaelangelo, Court;

React = require('react');
Canvas = require('../raphael/canvas');
Michaelangelo = require('michaelangelo');

opts = {
    'stroke-width': 2,
    ratio: 15
};

CourtData = {
    canvas: {
        width: 50,
        height: 60,
        ratio: 15
    },
    components: [
        // Boundaries
        new Michaelangelo.Rectangle({x: 0, y: 0, width: 50, height: 60}, opts),
        // Backboard
        new Michaelangelo.Path({x1: 22, y1: 4, x2: 28, y2: 4}, opts),
        // Hoop
        new Michaelangelo.Circle({cx: 25, cy: 4.75, r: .75}, opts),
        // 3-point posts
        new Michaelangelo.Path({x1:3, y1:0, x2:3, y2:14}, opts),
        new Michaelangelo.Path({x1:47, y1:0, x2:47, y2:14}, opts),
        // Paint
        new Michaelangelo.Rectangle({x: 17, y: 0, width: 16, height: 19}, opts),
        // Arc
        new Michaelangelo.Arc({x: 25, y: 14, width: 44, height: 23.75, theta1: 180, theta2: 360}, opts)
    ]
};


Court = React.createClass({
    render: function () {
        return <Canvas data={ CourtData } />;
    }
});

module.exports = Court;
