module.exports = function (percentage) {
  var brackets;

  brackets = [
    {
      limit: 0,
      style: {
        fill: 'red',
        opacity: 0.85
      }
    },
    {
      limit: 0.1,
      style: {
        fill: 'red',
        opacity: 0.75
      }
    },
    {
      limit: 0.2,
      style: {
        fill: 'orangered',
        opacity: 0.75
      }
    },
    {
      limit: 0.3,
      style: {
        fill: 'orangered',
        opacity: 0.5
      }
    },
    {
      limit: 0.4,
      style: {
        fill: 'orange',
        opacity: 0.5
      }
    },
    {
      limit: 0.5,
      style: {
        fill: 'yellow',
        opacity: 0.5
      }
    },
    {
      limit: 0.6,
      style: {
        fill: 'yellowgreen',
        opacity: 0.5
      }
    },
    {
      limit: 0.7,
      style: {
        fill: 'yellowgreen',
        opacity: 0.75
      }
    },
    {
      limit: 0.8,
      style: {
        fill: 'green',
        opacity: 0.5
      }
    },
    {
      limit: 0.9,
      style: {
        fill: 'green',
        opacity: 0.75
      }
    },
    {
      limit: 1,
      style: {
        fill: 'green',
        opacity: 0.85
      }
    }
  ];

  style = brackets.filter(function (bracket) {
    return percentage >= bracket.limit && percentage < (bracket.limit + 0.1);
  })[0].style;
  return style;
};
