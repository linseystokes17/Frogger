// --------------------------------------------------------------
//
// This system is responsible for handling the movement of any
// entity with a movable component.
//
// --------------------------------------------------------------
Frogger.systems.movement = (function () {
    'use strict';

    // --------------------------------------------------------------
    //
    // This handles the logic of moving the front of the entity, along
    // with adding segments as necessary during the move.
    //
    // --------------------------------------------------------------
    function move(entity, xIncrement, yIncrement) {
        let position = entity.components.position;

        // want the frog to only move one grid square size
        let xIncrSplit = xIncrement / 5;
        let yIncrSplit = yIncrement / 5;
        //
        // move the frog a fixed number of pixels, the equivalent of grid square
        // perform an animation over fixed time period, .5 ?
        entity.components.position.x += xIncrSplit;
        entity.components.position.y += yIncrSplit;
    }

    // --------------------------------------------------------------
    //
    // If the time interval is up on this entity for moving, move it
    // in the facing direction.
    //
    // --------------------------------------------------------------
    function moveEntity(entity, elapsedTime) {
        entity.components.movable.elapsedInterval = entity.components.movable.elapsedInterval + elapsedTime;
        if (entity.components.collision.alive == true){
            if(entity.components.keyboard.keyPressed == true){ // if its the frog, then move on keypress
                entity.components.keyboard.keyPressed = false;
                //console.log(entity.components.position);
                switch (entity.components.movable.facing) {
                    case Frogger.enums.Direction.Up:
                        move(entity, 0, -1);
                        break;
                    case Frogger.enums.Direction.Down:
                        move(entity, 0, 1);
                        break;
                    case Frogger.enums.Direction.Left:
                        move(entity, -1, 0);
                        break;
                    case Frogger.enums.Direction.Right:
                        move(entity, 1, 0);
                        break;
                }
            }
        }
        else if (entity.components.movable.elapsedInterval >= entity.components.movable.moveInterval) {
            entity.components.movable.elapsedInterval -= entity.components.movable.moveInterval;
            switch (entity.components.movable.facing) {
                case Frogger.enums.Direction.Up:
                    move(entity, 0, -1);
                    break;
                case Frogger.enums.Direction.Down:
                    move(entity, 0, 1);
                    break;
                case Frogger.enums.Direction.Left:
                    move(entity, -1, 0);
                    break;
                case Frogger.enums.Direction.Right:
                    move(entity, 1, 0);
                    break;
            }
        }
    }

    // --------------------------------------------------------------
    //
    // Grind through all the entities and move the ones that can move.
    //
    // --------------------------------------------------------------
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


