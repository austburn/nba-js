var React, Raphael, Canvas;

React = require ('react');
Raphael = require('raphael');

Canvas = React.createClass({
    componentDidMount: function () {
        var element, width, height;

        element = React.findDOMNode(this);
        width = this.props.data.width;
        height = this.props.data.height;

        Raphael(['canvas', width, height, this.props.data.court]);
    },

    render: function () {
        return <div id="canvas"></div>;
    }
});

module.exports = Canvas;
