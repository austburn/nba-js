var React, HelloWorld, body,

React = require('react');
HelloWorld = React.createClass({
    render: function () {
        return <div>Hello, world!</div>;
    }
});

body = document.getElementsByTagName('body')[0];

React.render(<HelloWorld />, body);
