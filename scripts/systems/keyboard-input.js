// --------------------------------------------------------------
//
// This system knows how to accept keyboard input and use that
// to move an entity, based on the entities 'keyboard'
// component settings.
//
// --------------------------------------------------------------
Midterm.systems.keyboardInput = (function (components) {
    'use strict';
    let keysDown = {};
    let pressed = false;
    let cancelNextRequest = false;
    let KEYS = {
        'Escape': Midterm.enums.Direction.Stopped
    };

    function keyPress(e) {
        keysDown[e.key] = e.timeStamp;
        pressed = true;
        return e.key;
    }
    
    function keyRelease(e) {
        delete keysDown[e.key];
        pressed = false;
    }

    function getKeys(){
        return KEYS;
    }

    function setKey(oldKey, newKey){
        let newConfig = KEYS[oldKey];
        KEYS[newKey] = newConfig;
        //KEYS.oldKey = newKey;
        delete KEYS[oldKey];
    }

    // --------------------------------------------------------------
    //
    // Public interface used to update entities based on keyboard input.
    //
    // --------------------------------------------------------------
    function update(elapsedTime, entities) {
        let event = 0;
        let handlerId = 0;
        let entry = null;

        //
        // Process the mouse events for each of the different kinds of handlers
        for (event = 0; event < eventMouseDown.length; event += 1) {
            for (handlerId in handlersDown) {
                if (handlersDown.hasOwnProperty(handlerId)) {
                    handlersDown[handlerId].handler(eventMouseDown[event], elapsedTime);
                }
            }
        }

        for (event = 0; event < eventMouseUp.length; event += 1) {
            for (handlerId in handlersUp) {
                if (handlersUp.hasOwnProperty(handlerId)) {
                    handlersUp[handlerId].handler(eventMouseUp[event], elapsedTime);
                }
            }
        }

        for (event = 0; event < eventMouseMove.length; event += 1) {
            for (handlerId in handlersMove) {
                if (handlersMove.hasOwnProperty(handlerId)) {
                    entry = handlersMove[handlerId];
                    //
                    // Mouse capture is unique to the move events, check for it before invoking the handler
                    if (entry.requireCapture && mouseCapture === true) {
                        entry.handler(eventMouseMove[event], elapsedTime);
                    } else if (entry.requireCapture === false) {
                        entry.handler(eventMouseMove[event], elapsedTime);
                    }
                }
            }
        }

        //
        // Now that we have processed all the inputs, reset everything back to the empty state
        eventMouseDown.length = 0;
        eventMouseUp.length = 0;
        eventMouseMove.length = 0;
    }

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    let api = {
        update: update,
        getKeys: getKeys,
        setKey: setKey,
        keyPress: keyPress,
        get cancelNextRequest(){return cancelNextRequest;},
        set cancelNextRequest(value){cancelNextRequest = value;}
    };

    return api;
}(Midterm.components));
