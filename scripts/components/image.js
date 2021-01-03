Midterm.components.Image = function(spec) {
    'use strict';
    let elapsedInterval = 0;

    let api = {
        get name() { return 'image'; },
        get image() {return spec.image},
        get width() { return spec.width; },
        get height() { return spec.height; },
        get x() { return spec.x; },
        get y() { return spec.y; },
        get spriteWidth() { return spec.spriteWidth; },
        get spriteHeight() { return spec.spriteHeight; },
        
        set x(value) { spec.x = value; },
        set y(value) { spec.y =value; },
        get direction() { return spec.direction; },
        set direction(value) { spec.direction = value; },
        get moveInterval() { return spec.moveInterval; },
        set moveInterval(value) { spec.moveInterval = value;},
        get elapsedInterval() { return elapsedInterval; },
        set elapsedInterval(value) { elapsedInterval = value; },
        get active(){return spec.active;},
        set active(value){spec.active = value;},
        get continueActive(){return spec.continueActive;},
        set continueActive(value){spec.continueActive = value;},
        
    };

    return api;
};
