Frogger.components.Collision = function(spec) {
    'use strict';

    let numLives = 5;
    let killed = false;
    let objectRiding = null;
    
    let api = {
        get name() { return 'collision'; },
        get alive() { return spec.alive; },
        set alive(value) { spec.alive = value;},
        get home() {return spec.home;},
        set home(value) {spec.home = value; },
        get killed(){ return killed;},
        set killed(value){ killed = value; },
        get drown() {return spec.drown;},
        set drown(value){spec.drown = value;},
        get riding(){return spec.riding},
        set riding(value){spec.riding = value; },
        get numLives(){ return numLives; },
        set numLives(value){numLives = value; },
        get objectRiding(){return objectRiding;},
        set objectRiding(value){objectRiding = value;}
    };

    return api;
};
