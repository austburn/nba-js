var utils = {};

utils.adjustCourtData = function (courtData) {
    var pixelsPerFoot, adjustedWidth, adjustedHeight, adjustedCourt, data;

    pixelsPerFoot = courtData.pixelsPerFoot;

    adjustedWidth = courtData.width * pixelsPerFoot;
    adjustedHeight = courtData.height * pixelsPerFoot;

    adjustedCourt = courtData.court.map(function (component) {
        switch (component.type) {
            case 'rect':
                return {
                    type: component.type,
                    x: component.x * pixelsPerFoot,
                    y: component.y * pixelsPerFoot,
                    width: component.width * pixelsPerFoot,
                    height: component.height * pixelsPerFoot
                }
        }
    });

    return {
        width: adjustedWidth,
        height: adjustedHeight,
        court: adjustedCourt
    }
};

module.exports = utils;
