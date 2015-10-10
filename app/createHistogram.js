var d3, generateSvgElements, addRects, addText, determinePercentage;

d3 = require('d3');

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

addText = function (bars, attribute) {
  var oppositeAttribute;
  oppositeAttribute = attribute === 'x' ? 'y' : 'x';
  bars.append('text')
      .attr('dy', '1.25em')
      .attr(oppositeAttribute, function (datapoints) {
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

module.exports = function (bins, scale, attribute, shotData) {
  var histogram, svg, width, upperRange, height, range, bars;
  upperRange = bins * scale;

  histogram = d3.layout.histogram()
            .range([0, upperRange])
            .bins(bins)
            .value(function (d) { return d[attribute] })
            (shotData);

  bars = generateSvgElements(histogram, upperRange, scale, attribute);
  addRects(bars, attribute);
  addText(bars, attribute);
};
