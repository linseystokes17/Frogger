Midterm.components.mouseInput = function(spec) {
    'use strict';

    let api = {
        get name() { return Midterm.enums.Input.Mouse; },
        get keys() { return spec.keys; },
        get keyPressed(){ return spec.keyPressed;},
        set keyPressed(value) { spec.keyPressed = value},
    };

    return api;
};
