var React, Raphael, Canvas;

React = require ('react');
Raphael = require('raphael');

Canvas = React.createClass({
    componentDidMount: function () {
        var width, height, args, components, paper;

        width = this.props.data.canvas.width * this.props.data.canvas.ratio;
        height = this.props.data.canvas.height * this.props.data.canvas.ratio;
        components = this.props.data.components.map(function (c) {
            return c.toRaphaelObject();
        });
        args = ['canvas', width, height].concat(components);

        paper = Raphael(args);
    },

    render: function () {
        return <div id="canvas"></div>;
    }
});

module.exports = Canvas;
