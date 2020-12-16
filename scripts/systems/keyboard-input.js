// --------------------------------------------------------------
//
// This system knows how to accept keyboard input and use that
// to move an entity, based on the entities 'keyboard-controlled'
// component settings.
//
// --------------------------------------------------------------
Frogger.systems.keyboardInput = (function (components) {
    'use strict';
    let keysDown = {};

    function keyPress(e) {
        keysDown[e.key] = e.timeStamp;
    }
    
    function keyRelease(e) {
        delete keysDown[e.key];
    }

    // --------------------------------------------------------------
    //
    // Public interface used to update entities based on keyboard input.
    //
    // --------------------------------------------------------------
    function update(elapsedTime, entities) {
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components[Frogger.enums.Input.KeyboardControlled]) {
                let input = entity.components[Frogger.enums.Input.KeyboardControlled];
                for (let key in input.keys) {
                    if (keysDown[key]) {
                        // Protect against turning back onto itself
                        entity.components.movable.facing = input.keys[key];
                    }
                }
            }
        }
    }

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    let api = {
        update: update
    };

    return api;
}(Frogger.components));
