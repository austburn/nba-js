var utils = {};

utils.adjustCourtData = function (courtData) {
    var pixelsPerFoot, adjustedWidth, adjustedHeight, adjustedCourt, data;

    pixelsPerFoot = courtData.pixelsPerFoot;

    adjustedWidth = courtData.width * pixelsPerFoot;
    adjustedHeight = courtData.height * pixelsPerFoot;

    adjustedCourt = courtData.court.map(function (component) {
        var raphaelComponent;

        raphaelComponent = {
            type: component.type
        }

        switch (component.type) {
            case 'rect':
                    raphaelComponent.x = component.x * pixelsPerFoot;
                    raphaelComponent.y = component.y * pixelsPerFoot;
                    raphaelComponent.width = component.width * pixelsPerFoot;
                    raphaelComponent.height = component.height * pixelsPerFoot;
                    break;
            case 'path':
                    raphaelComponent.pathString = 'M' + component.x1 * pixelsPerFoot + ',' + component.y1 * pixelsPerFoot + 'L' + component.x2 * pixelsPerFoot + ',' + component.y2 * pixelsPerFoot;
                    break;
        }

        return raphaelComponent;
    });

    return {
        width: adjustedWidth,
        height: adjustedHeight,
        court: adjustedCourt
    }
};

module.exports = utils;
