// --------------------------------------------------------------
//
// This system is responsible for handling the movement of any
// entity with a movable component.
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
        entity.components.position.x += xIncrement;
        entity.components.position.y += yIncrement;
    }

    function moveEntity(entity, elapsedTime) { 
        entity.components.movable.elapsedInterval += elapsedTime;
        
        if(entity.components.movable.elapsedInterval >= entity.components.movable.moveInterval){
            entity.components.movable.elapsedInterval = 0;
            switch (entity.components.movable.facing) {
                case Midterm.enums.Direction.Left:
                    move(entity, -1, 0);
                    break;
                case Midterm.enums.Direction.Right:
                    move(entity, 1, 0);
                    break;
            }
        }
    }

    // --------------------------------------------------------------
    // Grind through all the entities and move the ones that can move.
    // -------------------------------------------------------------
    function update(elapsedTime, entities) {
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.position && entity.components.movable) {
                moveEntity(entity, elapsedTime);
            }
        }
    }

    let api = {
        update: update
    };

    return api;
}());


