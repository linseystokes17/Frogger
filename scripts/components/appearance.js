Frogger.components.Appearance = function(spec) {
    'use strict';

    let api = {
        get name() { return 'appearance'; },
        get fill() { return spec.fill; },
        get stroke() { return spec.stroke; },
        get image() { return spec.image; },
        get shape() { return spec.shape; },
    };

    return api;
};
