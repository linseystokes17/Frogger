// --------------------------------------------------------------
//
// This system knows how to accept keyboard input and use that
// to move an entity, based on the entities 'keyboard'
// component settings.
//
// --------------------------------------------------------------
Frogger.systems.keyboardInput = (function (components) {
    'use strict';
    let keysDown = {};
    let pressed = false;
    let cancelNextRequest = false;

    function keyPress(e) {
        keysDown[e.key] = e.timeStamp;
        pressed = true;
    }
    
    function keyRelease(e) {
        delete keysDown[e.key];
        pressed = false;
    }

    // --------------------------------------------------------------
    //
    // Public interface used to update entities based on keyboard input.
    //
    // --------------------------------------------------------------
    function update(elapsedTime, entities) {
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components[Frogger.enums.Input.Keyboard]) {
                let input = entity.components[Frogger.enums.Input.Keyboard];
                for (let key in input.keys) {
                    entity.components.keyboard.keyPressed = pressed;
                    if (keysDown[key] && pressed == true) {
                        // Protect against turning back onto itself
                        entity.components.movable.facing = input.keys[key];

                        if(key == 'Escape'){
                            cancelNextRequest = true;
                        }
                    }
                }
            }
        }
    }

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    let api = {
        update: update,
        get cancelNextRequest(){return cancelNextRequest;},
        set cancelNextRequest(value){cancelNextRequest = value;}
    };

    return api;
}(Frogger.components));
