// --------------------------------------------------------------
//
// This system is responsible for handling the movement of any
// entity with a image component.
//
// --------------------------------------------------------------
Midterm.systems.movement = (function () {
    'use strict';

    // --------------------------------------------------------------
    //
    // This handles the logic of moving the front of the entity, along
    // with adding segments as necessary during the move.
    //
    // --------------------------------------------------------------
    function move(entity, xIncrement, yIncrement) {
        entity.components.image.x += xIncrement;
        entity.components.image.y += yIncrement;
    }


    function moveEntity(entity, elapsedTime) { 
        entity.components.image.elapsedInterval += elapsedTime;
        // move the entity in the direction of empty square, 
        // if square is not empty (aka collision), do nothing
        //move(entity, 0, 1);
    }

    // --------------------------------------------------------------
    // Grind through all the entities and move the ones that can move.
    // -------------------------------------------------------------
    function update(elapsedTime, entities) {
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.image) {
                moveEntity(entity, elapsedTime);
            }
        }
    }

    let api = {
        update: update
    };

    return api;
}());


