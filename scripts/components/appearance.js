Frogger.components.Appearance = function(spec) {
    'use strict';

    let api = {
        get name() { return 'appearance'; },
        get fill() { return spec.fill; },
        get stroke() { return spec.stroke; },
        get image() { return spec.image; },
        get type() { return spec.type;},
        set type(value) { spec.type = value;},
        get index() { return spec.index;},
        set index(value) {spec.index = value;},
    };

    return api;
};
