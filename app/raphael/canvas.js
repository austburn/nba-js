var React, Raphael, Canvas;

React = require ('react');
Raphael = require('raphael');

Canvas = React.createClass({
    componentDidMount: function () {
        var element, width, height;

        element = React.findDOMNode(this);
        width = parseInt(this.props.width, 10);
        height = parseInt(this.props.height, 10);

        Raphael('canvas', width, height);
    },

    render: function () {
        return <div id="canvas"></div>;
    }
});

module.exports = Canvas;
