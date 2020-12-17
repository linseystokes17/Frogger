// --------------------------------------------------------------
//
// This system is responsible for handling the movement of any
// entity with a movable component.
//
// --------------------------------------------------------------
Frogger.systems.movement = (function () {
    'use strict';
    let totalTime = 0;
    let lastTimeStamp = 0;

    // --------------------------------------------------------------
    //
    // This handles the logic of moving the front of the entity, along
    // with adding segments as necessary during the move.
    //
    // --------------------------------------------------------------
    function move(entity, xIncrement, yIncrement, gridSize) {
        // need to make sure that the position won't be out of canvas range
        // TODO
        let position = entity.components.position;

        // want the frog to only move one grid square size
        let xIncrSplit = xIncrement / (gridSize);
        let yIncrSplit = yIncrement / (gridSize);
        let i = 0;

        while (i < gridSize){
            entity.components.position.x += xIncrSplit;
            entity.components.position.y += yIncrSplit;
            i++;
        }
        

        //
        // move the frog a fixed number of pixels, the equivalent of grid square
        // perform an animation over fixed time period, .5 ?
        
    }

    // --------------------------------------------------------------
    //
    // If the time interval is up on this entity for moving, move it
    // in the facing direction.
    //
    // --------------------------------------------------------------
    function moveEntity(entity, elapsedTime, totalTime, gridSize) {
        entity.components.movable.elapsedInterval = entity.components.movable.elapsedInterval + elapsedTime;
        //console.log('ElapsedTime: ', elapsedTime);
        //console.log('TotalTime: ', totalTime);

        if (entity.components.collision.alive == true){
            if(entity.components.keyboard.keyPressed == true && totalTime-lastTimeStamp > 300){ // if its the frog, then move on keypress
                console.log('totalTime-lastTimeStamp: ', totalTime-lastTimeStamp);

                lastTimeStamp = totalTime;
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
            else{
                entity.components.keyboard.keyPressed = false;

            }
        }
        else if (entity.components.movable.elapsedInterval >= entity.components.movable.moveInterval && elapsedTime >= .99) {
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


