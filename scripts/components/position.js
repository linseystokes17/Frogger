Frogger.components.Position = function(spec) {
    'use strict';

    let api = {
        get name() { return 'position'; },
        get x() { return spec.x; },
        get y() { return spec.y; },
        set x(value) { spec.x = value; },
        set y(value) { spec.y =value; },
        get width() { return spec.width; },
        set width(value){ spec.width = value;},
        get height() { return spec.height; },
        set height(value){ spec.height = value;},
    };

    return api;
};
