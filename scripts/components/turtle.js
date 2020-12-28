Frogger.components.Turtle = function(spec) {
    'use strict';
    let api = {
        get name() { return 'turtle'; },
        get chosen(){ return spec.chosen;},
        set chosen(value){ spec.chosen = value;},
    };

    return api;
};