var React, Court, body;

React = require('react');
Court = require('./court');

body = document.getElementsByTagName('body')[0];

React.render(<Court />, body);
