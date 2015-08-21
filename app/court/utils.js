var utils = {};

utils.adjustCourtData = function (courtData) {
    var pixelsPerFoot, adjustedWidth, adjustedHeight, adjustedComponents, data;

    pixelsPerFoot = courtData.pixelsPerFoot;

    adjustedWidth = courtData.width * pixelsPerFoot;
    adjustedHeight = courtData.height * pixelsPerFoot;

    adjustedComponents = courtData.components.map(function (component) {
        var raphaelComponent;
        raphaelComponent = component.toRaphaelObject({'stroke-width': 2, ratio: pixelsPerFoot});
        return raphaelComponent;
    });

    return {
        width: adjustedWidth,
        height: adjustedHeight,
        components: adjustedComponents
    }
};

module.exports = utils;
