Frogger.components.AnimatedModel = function(spec) {
    'use strict';

    let api = {
        get name() { return 'animated-model'; },
        get spritesheet() { return spec.spritesheet; },
        get spriteCount() { return spec.spriteCount; },
        get spriteTime() { return spec.spriteTime; },
    };

    return api;
};
