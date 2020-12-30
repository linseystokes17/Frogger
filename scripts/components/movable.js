Frogger.components.Movable = function(spec) {
    'use strict';
    let elapsedInterval = 0;

    let api = {
        get name() { return 'movable'; },
        get facing() { return spec.facing; },
        set facing(value) { spec.facing = value; },
        get direction() { return spec.direction; },
        set direction(value) { spec.direction = value; },
        get directionInterval() { return spec.directionInterval; },
        set directionInterval(value) { spec.directionInterval = value; },
        get directionElapsedInterval() { return spec.directionElapsedInterval; },
        set directionElapsedInterval(value) { spec.directionElapsedInterval = value; },
        get canMove() {return spec.canMove;},
        set canMove(value) {spec.canMove = value;},
        get moveInterval() { return spec.moveInterval; },
        set moveInterval(value) { spec.moveInterval = value;},
        get elapsedInterval() { return elapsedInterval; },
        set elapsedInterval(value) { elapsedInterval = value; },
        get animationInterval() { return spec.animationInterval; },
        set animationInterval(value) { spec.animationInterval = value; },
        
    };

    return api;
};
