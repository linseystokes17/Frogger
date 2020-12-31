Midterm.components.Collision = function(spec) {
    'use strict';
    
    let api = {
        get name() { return 'collision'; },
        get blankAdjacent(){return spec.blackAdjacent;},
        set blackAdjacent(value){spec.blackAdjacent = value;},
        
    };

    return api;
};
