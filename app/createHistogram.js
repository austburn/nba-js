var d3, attributeMap, generateSvgElements, addRects, addText, determinePercentage;

d3 = require('d3');

attributeMap = {
  x: {
    name: 'x',
    opposite: 'y',
    translation: '{value},0',
    widthAttribute: 'width',
    boxWidthAttribute: 'width',
    boxHeightAttribute: 'height'
  },
  y: {
    name: 'y',
    opposite: 'x',
    translation: '0,{value}',
    widthAttribute: 'height',
    boxWidthAttribute: 'height',
    boxHeightAttribute: 'width'
  }
};

String.prototype.format = function (keys) {
  var newStr;
  for (key in keys) {
    newStr = this.replace('{' + key + '}', keys[key]);
  }
  return newStr;
};

generateSvgElements = function (histogram, upperRange, scale, attribute) {
  var svg, range, bars;

  svg = d3.select('body')
          .append('svg')
          .attr(attribute.widthAttribute, upperRange)
          .attr('class', attribute.name + '-histo');

  range = d3.range(0, upperRange, scale).reverse();
  bars = svg.selectAll('g')
            .data(histogram)
            .enter()
            .append('g')
            .attr('transform', function () {
              var value, translation;
              value = range.pop();
              return 'translate(' + attribute.translation.format({'value': value}) + ')';
            });
  return bars;
};

addRects = function (bars, attribute) {
  bars.append('rect')
      .attr(attribute.boxWidthAttribute, 15)
      .attr(attribute.boxHeightAttribute, function (datapoints) {
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
  bars.append('text')
      .attr('dy', '1.25em')
      .attr(attribute.opposite, function (datapoints) {
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
  var histogram, upperRange, bars;
  upperRange = bins * scale;

  histogram = d3.layout.histogram()
            .range([0, upperRange])
            .bins(bins)
            .value(function (d) { return d[attribute] })
            (shotData);

  return histogram;
};
