Frogger.components.KeyboardControlled = function(spec) {
    'use strict';

    let api = {
        get name() { return Frogger.enums.Input.KeyboardControlled; },
        get keys() { return spec.keys; }
    };

    return api;
};
