var utils = {};

utils.adjustCourtData = function (courtData) {
    var pixelsPerFoot, adjustedWidth, adjustedHeight, adjustedComponents, data;

    pixelsPerFoot = courtData.pixelsPerFoot;

    adjustedWidth = courtData.width * pixelsPerFoot;
    adjustedHeight = courtData.height * pixelsPerFoot;

    adjustedComponents = courtData.components.map(function (component) {
        var raphaelComponent, opts;

        raphaelComponent = {
            type: component.type,
            'stroke-width': 2
        }

        opts = {'stroke-width': 2, ratio: pixelsPerFoot};

        switch (component.type) {
            case 'path':
                raphaelComponent.path = 'M' + component.x1 * pixelsPerFoot + ',' + component.y1 * pixelsPerFoot + 'L' + component.x2 * pixelsPerFoot + ',' + component.y2 * pixelsPerFoot;
                break;
            case 'circle':
                raphaelComponent = component.toRaphaelObject(opts);
                break;
            case 'rect':
                raphaelComponent = component.toRaphaelObject(opts);
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
