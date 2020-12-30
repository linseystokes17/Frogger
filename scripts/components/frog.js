Frogger.components.Frog = function(spec) {
    'use strict';
    let api = {
        get name() { return 'frog'; },
        get totalTime(){return spec.totalTime;},
        set totalTime(value){spec.totalTime = value;},
        get numLives(){return spec.numLives;},
        set numLives(value){spec.numLives = value;},
    };

    return api;
};