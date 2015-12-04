var React, d3, Canvas, CourtData, opts, Michaelangelo, Court, createHistogram;

React = require('react');
d3 = require('d3');
Canvas = require('./canvas');
Michaelangelo = require('michaelangelo');
createHistogram = require('./createHistogram');

opts = {
    'stroke-width': 2,
    scale: 15
};

CourtData = {
    canvas: {
        width: 50,
        height: 60,
        scale: 15
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
        new Michaelangelo.Arc({cx: 25, cy: 14, width: 44, height: 23.75, theta1: 180, theta2: 360}, opts),
        // Paint Circle
        new Michaelangelo.Circle({cx: 25, cy: 19, r: 6}, opts),
        // Inner Paint
        new Michaelangelo.Rectangle({x: 19, y:0, width: 12, height: 19}, opts),
        // no rebound zone
        new Michaelangelo.Arc({cx:25, cy: 4.75, width: 6, height: 4, theta1: 180, theta2: 360}, opts),
        // half-court
        new Michaelangelo.Path({x1: 0, y1: 47, x2: 50, y2: 47}, opts)
    ]
};

Court = React.createClass({
    render: function () {
        return <Canvas data={ CourtData } />;
    },

    componentDidMount: function () {
      var svg, point, canvasScale, nbaStatsScale, scaleRatio;

      canvasScale = CourtData.canvas.scale;
      nbaStatsScale = 10;
      scaleRatio = canvasScale / nbaStatsScale;

      svg = d3.select('#canvas').select('svg');
      d3.json("http://localhost:3030/data?id=201935", function (err, json) {
        var headers, shotData, xIndex, yIndex, shotMadeIndex, determinePercentage;

        headers = json.pop();
        xIndex = headers.indexOf('LOC_X');
        yIndex = headers.indexOf('LOC_Y');
        shotMadeIndex = headers.indexOf('SHOT_MADE_FLAG');

        shotData = json.map(function (shot) {
          return {
            x: (shot[xIndex] + 250) * scaleRatio,
            y: (shot[yIndex] + 40) * scaleRatio,
            shotMade: shot[shotMadeIndex]
          };
        });

        shotData.forEach(function (shot) {
          var fill;
          fill = shot.shotMade ? '#27ae60': '#c0392b';
          svg.append('circle')
            .attr('r', 3.5)
            .attr('cx', shot.x)
            .attr('cy', shot.y)
            .style({
              'fill': fill,
              'stroke': '#7f8c8d',
              'stroke-width': '1px'
            });
        });

        xHisto = createHistogram(CourtData.canvas.width, CourtData.canvas.scale, 'x', shotData);
        yHisto = createHistogram(CourtData.canvas.height, CourtData.canvas.scale, 'y', shotData);

        yHisto.forEach(function (yShots, yIndex) {
          xHisto.forEach(function (xShots, xIndex) {
            var allShots, made;
            allShots = xShots.concat(yShots);
            made = allShots.filter(function (shot) { return shot.shotMade }).length;
            if (allShots.length == 0) {
              percentage = 0;
            } else {
              percentage = made / allShots.length;
            }

            xPoint = xIndex * 15;
            yPoint = yIndex * 15;
            color = percentage < 0.5 ? 'red' : 'green';

            svg.append('rect')
              .attr('x', xPoint)
              .attr('y', yPoint)
              .attr('height', 15)
              .attr('width', 15)
              .style({
                'fill': color,
                'opacity': 0.5
              });
          });
        });

      });
    }
});

module.exports = Court;
