Frogger.components.Movable = function(spec) {
    'use strict';
    let elapsedInterval = 0;

    let api = {
        get name() { return 'movable'; },
        get facing() { return spec.facing; },
        set facing(value) { spec.facing = value; },
        get moveInterval() { return spec.moveInterval; },
        get elapsedInterval() { return elapsedInterval; },
        set elapsedInterval(value) { elapsedInterval = value; }
    };

    return api;
};
