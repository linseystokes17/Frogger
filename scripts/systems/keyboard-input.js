// --------------------------------------------------------------
//
// This system knows how to accept keyboard input and use that
// to move an entity, based on the entities 'keyboard-controlled'
// component settings.
//
// --------------------------------------------------------------
Frogger.systems.keyboardInput = function () {
    let that = {
        keys: {},
        handlers: {}
    };

    function keyPress(e) {
        that.keys[e.key] = e.timeStamp;
    }

    function keyRelease(e) {
        delete that.keys[e.key];
    }

    that.update = function (elapsedTime) {
        for (let key in that.keys) {
            if (that.keys.hasOwnProperty(key)) {
                if (that.handlers[key]) {
                    that.handlers[key](elapsedTime);
                }
            }
        }
    };

    that.register = function (key, handler) {
        that.handlers[key] = handler;
    };

    that.unregister = function(key, handler){
        that.handlers[key] = null;
    }

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    return that;
};
