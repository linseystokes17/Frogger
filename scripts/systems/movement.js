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
    function move(entity, xIncrement, yIncrement, gridSize) {
        let numGrids = -3 // 3 'block' buffer on each side
       
        if (entity.components.position.x+xIncrement >= gridSize-numGrids){
            entity.components.position.x = numGrids;
        }
        if (entity.components.position.x+(xIncrement) <= numGrids){
            entity.components.position.x = gridSize-numGrids;
        }

        entity.components.position.x += xIncrement;
        entity.components.position.y += yIncrement;
        
        // entity.components.position.x = Math.round(entity.components.position.x);
        entity.components.position.y = Math.round(entity.components.position.y);   
    }

    // --------------------------------------------------------------
    //
    // If the time interval is up on this entity for moving, move it
    // in the facing direction.
    //
    // --------------------------------------------------------------
    function moveEntity(entity, elapsedTime, totalTime, gridSize) {        
        entity.components.movable.elapsedInterval = entity.components.movable.elapsedInterval + elapsedTime;
        // console.log('elapsedInterval1: ', entity.components.movable.elapsedInterval);

        if(entity.components.movable.elapsedInterval >= entity.components.movable.moveInterval){
            entity.components.movable.elapsedInterval = 0;

            if (entity.components.collision.alive == true && entity.components.keyboard.keyPressed == true){
                entity.components.keyboard.keyPressed = false;
                switch (entity.components.movable.facing) {
                    case Frogger.enums.Direction.Up:
                        move(entity, 0, -1, gridSize);
                        break;
                    case Frogger.enums.Direction.Down:
                        move(entity, 0, 1, gridSize);
                        break;
                    case Frogger.enums.Direction.Left:
                        move(entity, -1, 0, gridSize);
                        break;
                    case Frogger.enums.Direction.Right:
                        move(entity, 1, 0, gridSize);
                        break;
                };
            }
            else if (entity.components.collision.alive == false){
                switch (entity.components.movable.facing) {
                    case Frogger.enums.Direction.Left:
                        move(entity, -1/64, 0, gridSize);
                        break;
                    case Frogger.enums.Direction.Right:
                        move(entity, 1/64, 0, gridSize);
                        break;
                }
            } else{
                entity.components.keyboard.keyPressed = false;
            }
        }
    }

    // --------------------------------------------------------------
    //
    // Grind through all the entities and move the ones that can move.
    //
    // --------------------------------------------------------------
    function update(elapsedTime, totalTime, entities, gridSize) {
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.position && entity.components.movable) {
                moveEntity(entity, elapsedTime, totalTime, gridSize);
            }
        }
    }

    let api = {
        update: update
    };

    return api;
}());


