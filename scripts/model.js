// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Midterm.model = (function(components, graphics, assets) {
    'use strict';
    let that = {};
    let entities = {};  // key is 'id', value is an Entity

    
    // ------------------------------------------------------------------
    // Setup model & report events
    // ------------------------------------------------------------------
    function reportEvent(info) {
        switch (info.type) {
            case Midterm.enums.Event.ReachHome:
                console.log('Reach Home');
        }
    }

    that.initialize = function() {
        console.log('init model');
    };

    that.reset = function(){
        console.log('reset model');
    }

    // ------------------------------------------------------------------
    // This function is used to update the state of the demo model.
    // ------------------------------------------------------------------
    that.update = function(elapsedTime, totalTime) {
        Midterm.systems.keyboardInput.update(elapsedTime, entities);
        Midterm.systems.movement.update(elapsedTime, entities);
        Midterm.systems.collision.update(elapsedTime, totalTime, entities, reportEvent);
        Midterm.systems.render.update(elapsedTime, totalTime, entities);
    };

    return that;

}(Midterm.components, Midterm.graphics, Midterm.assets));
