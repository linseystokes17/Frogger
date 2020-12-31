Midterm.components.Particles = function(spec) {
    'use strict';

    let api = {
        get name() { return 'particles'; },
        get type(){return spec.type;},
        get active(){return spec.active;},
        set active(value){spec.active = value;},

        get rotation(){return spec.rotation;},
        set rotation(value){spec.rotation = value;},
        get image() {return spec.image;},
        set image(value) {spec.image = value;},
        get center(){return spec.center;},
        set center(value){spec.center = value;},
        get size(){return spec.size;},
        set size(value){spec.size = value;},
        get speed(){return spec.speed;},
        set speed(value){spec.speed = value;},
        get lifetime(){return spec.lifetime;},
        set lifetime(value){spec.lifetime = value;},
    };

    return api;
}