var React, Canvas, body;

React = require('react');
Canvas = require('./canvas');

body = document.getElementsByTagName('body')[0];

React.render(<Canvas width="500" height="500" />, body);
