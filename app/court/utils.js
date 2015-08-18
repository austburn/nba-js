var utils = {};

utils.adjustCourtData = function (courtData) {
    var pixelsPerFoot, adjustedWidth, adjustedHeight, adjustedComponents, data;

    pixelsPerFoot = courtData.pixelsPerFoot;

    adjustedWidth = courtData.width * pixelsPerFoot;
    adjustedHeight = courtData.height * pixelsPerFoot;

    adjustedComponents = courtData.components.map(function (component) {
        var raphaelComponent;

        raphaelComponent = {
            type: component.type,
            'stroke-width': 2
        }

        switch (component.type) {
            case 'path':
                raphaelComponent.path = 'M' + component.x1 * pixelsPerFoot + ',' + component.y1 * pixelsPerFoot + 'L' + component.x2 * pixelsPerFoot + ',' + component.y2 * pixelsPerFoot;
                break;
            case 'circle':
                raphaelComponent.cx = component.cx * pixelsPerFoot;
                raphaelComponent.cy = component.cy * pixelsPerFoot;
                raphaelComponent.r = component.r * pixelsPerFoot;
                break;
            case 'rect':
                raphaelComponent.x = component.x * pixelsPerFoot;
                raphaelComponent.y = component.y * pixelsPerFoot;
                raphaelComponent.width = component.width * pixelsPerFoot;
                raphaelComponent.height = component.height * pixelsPerFoot;
                break;
        }

        return raphaelComponent;
    });

    return {
        width: adjustedWidth,
        height: adjustedHeight,
        components: adjustedComponents
    }
};

module.exports = utils;
