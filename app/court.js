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

        createHistogram = function (bins, scale, attribute, shotData) {
          var histogram, svg, width, upperRange, height, range, bars;
          upperRange = bins * scale;

          histogram = d3.layout.histogram()
                    .range([0, upperRange])
                    .bins(bins)
                    .value(function (d) { return d[attribute] })
                    (shotData);

          bars = generateSvgElements(histogram, upperRange, scale, attribute);
          addRects(bars);
          return bars;
        };

        generateSvgElements = function (histogram, upperRange, scale, attribute) {
          var width, height, svg, range, bars;

          if (attribute === 'x') {
            width = upperRange;
            height = 50;
          } else {
            width = 50;
            height = upperRange;
          }

          svg = d3.select('body')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('class', attribute + '-histo');

          range = d3.range(0, upperRange, scale).reverse();
          bars = svg.selectAll('g')
                    .data(histogram)
                    .enter()
                    .append('g')
                    .attr('transform', function () {
                      var value, translation;
                      value = range.pop();
                      translation = attribute === 'x' ? value + ',0' : '0,' + value;
                      return 'translate(' + translation + ')';
                    });
          return bars;
        };

        addRects = function (bars, attribute) {
          var associateAttribute, oppositeAttribute;
          associateAttribute = attribute === 'x' ? 'width' : 'height';
          oppositeAttribute = attribute === 'x' ? 'height' : 'width';
          bars.append('rect')
              .attr(associateAttribute, 15)
              .attr(oppositeAttribute, function (datapoints) {
                var percentage;
                percentage = determinePercentage(datapoints);
                return percentage * 50;
              }).style({
                'fill': '#bddfeb',
                'stroke': '#272E31',
                'stroke-width': '1px'
              });
        };

        determinePercentage = function (datapoints) {
            var shotsMade;

            shotsMade = datapoints.filter(function (d) {
              return d.shotMade;
            }).length;

            if (!(shotsMade && datapoints.length)) {
              return 0;
            }

            return shotsMade/datapoints.length;
        };

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
        xHistoBars = createHistogram(CourtData.canvas.width, CourtData.canvas.scale, 'x', shotData);
        yHistoBars = createHistogram(CourtData.canvas.height, CourtData.canvas.scale, 'y', shotData);

        xHistoBars.append('text')
          .attr('dy', '.75em')
          .attr('y', function (datapoints) {
            var percentage;
            percentage = determinePercentage(datapoints);
            return percentage * 50;
          })
          .text(function (datapoints) {
            var percentage;
            percentage = determinePercentage(datapoints);
            return percentage.toPrecision(2);
          })
          .style({
            'font-size': '.55em'
          });

        yHistoBars.append('text')
          .attr('dy', '1.25em')
          .attr('x', function (datapoints) {
            var percentage;
            percentage = determinePercentage(datapoints);
            return percentage * 50;
          })
          .text(function (datapoints) {
            var percentage;
            percentage = determinePercentage(datapoints);
            return percentage.toPrecision(2);
          })
          .style({
            'font-size': '.55em'
          });
      });
    }
});

module.exports = Court;
