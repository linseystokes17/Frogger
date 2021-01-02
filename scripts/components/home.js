Frogger.components.Home = function(spec) {
    'use strict';
    let api = {
        get name() { return 'home'; },
        get changeInterval(){return spec.changeInterval;},
        set changeInterval(value){spec.changeInterval = value;}
    };

    return api;
};