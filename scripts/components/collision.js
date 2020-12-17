Frogger.components.Collision = function(spec) {
    'use strict';

    let api = {
        get name() { return 'collision'; },
        get alive() { return spec.alive; },
        set alive(value) { spec.alive = value;},
    };

    return api;
};
