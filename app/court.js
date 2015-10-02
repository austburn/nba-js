var React, d3, Canvas, CourtData, opts, Michaelangelo, Court;

React = require('react');
d3 = require('d3');
Canvas = require('./canvas');
Michaelangelo = require('michaelangelo');

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

      madeX = [];
      madeY = [];
      svg = d3.select('#canvas').select('svg');
      d3.json("http://localhost:3030/data?id=201935", function (err, json) {
        var headers, shotData, xIndex, yIndex, shotMadeIndex;

        headers = json.pop();
        xIndex = headers.indexOf('LOC_X');
        yIndex = headers.indexOf('LOC_Y');
        shotMadeIndex = headers.indexOf('SHOT_MADE_FLAG');

        shotData = json;
        shotData.forEach(function (shot) {
          var x, y, shotMade, fill;

          x = (shot[xIndex] + 250) * scaleRatio;
          y = (shot[yIndex] + 40) * scaleRatio;
          shotMade = shot[shotMadeIndex];
          fill = shotMade ? '#27ae60': '#c0392b';

          if (shotMade) {
            madeX.push(x);
            madeY.push(y);
          }

          svg.append('circle')
            .attr('r', 3.5)
            .attr('cx', x)
            .attr('cy', y)
            .style({
              'fill': fill,
              'stroke': '#7f8c8d',
              'stroke-width': '1px'
            });
        });
        xHisto = d3.layout.histogram()
                  .bins(50)
                  (madeX);

        yHisto = d3.layout.histogram()
                  .range([0, 900])
                  .bins(60)
                  (madeY);

        xHistoSvg = d3.select('body').append('svg').attr('width', 750).attr('height', 700);
        bar = xHistoSvg.selectAll('g').data(xHisto).enter().append('g');
        start = -15;
        bar.append('rect')
          .attr('x', function () {
            return start += 15;
          })
          .attr('width', 15)
          .attr('height', function (d) {
            return d.length * 1.5;
          }).style({
            'fill': '#bddfeb',
            'stroke': '#272E31',
            'stroke-width': '1px'
          });
        yHistoSvg = d3.select('body').append('svg').attr('width', 750).attr('height', 900).style({'top': 8, 'left': 758, 'position': 'absolute'});
        bar = yHistoSvg.selectAll('g').data(yHisto).enter().append('g');
        start = -15;
        bar.append('rect')
          .attr('y', function () {
            return start += 15;
          })
          .attr('height', 15)
          .attr('width', function (d) {
            return d.length * 1.5;
          }).style({
            'fill': '#bddfeb',
            'stroke': '#272E31',
            'stroke-width': '1px'
          });

      });
    }
});

module.exports = Court;
