Midterm.components.Movable = function(spec) {
    'use strict';
    let elapsedInterval = 0;

    let api = {
        get name() { return 'movable'; },
        get facing() { return spec.facing; },
        set facing(value) { spec.facing = value; },
        get direction() { return spec.direction; },
        set direction(value) { spec.direction = value; },
        get moveInterval() { return spec.moveInterval; },
        set moveInterval(value) { spec.moveInterval = value;},
        get elapsedInterval() { return elapsedInterval; },
        set elapsedInterval(value) { elapsedInterval = value; },
        
    };

    return api;
};
