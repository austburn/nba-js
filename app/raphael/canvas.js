var React, Raphael, Canvas;

React = require ('react');
Raphael = require('raphael');

Canvas = React.createClass({
    componentDidMount: function () {
        var width, height, args, paper;

        width = this.props.data.width;
        height = this.props.data.height;
        args = ['canvas', width, height].concat(this.props.data.components);

        paper = Raphael(args);
    },

    render: function () {
        return <div id="canvas"></div>;
    }
});

module.exports = Canvas;
