// --------------------------------------------------------------
//
// This system is responsible for handling the movement of any
// entity with a movable component.
//
// --------------------------------------------------------------
Frogger.systems.movement = (function () {
    'use strict';
    let gator = 0;
    let turtle = 0;
    let turtleInc = 200;

    // --------------------------------------------------------------
    //
    // This handles the logic of moving the front of the entity, along
    // with adding segments as necessary during the move.
    //
    // --------------------------------------------------------------
    function move(entity, xIncrement, yIncrement) {
        let numGrids = -2 // 3 'block' buffer on each side
        let gridSize = 15;
       
        if (entity.components.position.x+xIncrement >= gridSize-numGrids){
            entity.components.position.x = numGrids;
        }
        if (entity.components.position.x+(xIncrement) <= numGrids){
            entity.components.position.x = gridSize-numGrids;
        }

        entity.components.position.x += xIncrement;
        entity.components.position.y += yIncrement;
    }

    // --------------------------------------------------------------
    //
    // If the time interval is up on this entity for moving, move it
    // in the facing direction.
    //
    // --------------------------------------------------------------
    function moveFrog(entity, elapsedTime, gridSize){
        let splitSize = 8;
        entity.components.movable.elapsedInterval += elapsedTime;

        if (entity.components.keyboard.keyPressed && entity.components.movable.canMove && entity.components.movable.elapsedInterval >= entity.components.movable.moveInterval){
            Frogger.assets.hop.play();
            entity.components.appearance.sprite = entity.components.appearance.sprite + 1;
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
            };
            entity.components.movable.elapsedInterval = 0;
        }

        if(entity.components.collision.riding){
            entity.components.movable.directionElapsedInterval += elapsedTime;
            if(entity.components.movable.directionElapsedInterval >= entity.components.movable.directionInterval){
                splitSize = 32;
                switch (entity.components.movable.direction) {
                    case Frogger.enums.Direction.Up:
                        move(entity, 0, -1/splitSize);
                        break;
                    case Frogger.enums.Direction.Down:
                        move(entity, 0, 1/splitSize);
                        break;
                    case Frogger.enums.Direction.Left:
                        move(entity, -1/splitSize, 0);
                        break;
                    case Frogger.enums.Direction.Right:
                        move(entity, 1/splitSize, 0,);
                        break;
                };
            } 
            if (entity.components.keyboard.keyPressed){
                entity.components.collision.riding = false;
                entity.components.movable.direction = Frogger.enums.Direction.Stopped;
                entity.components.movable.directionInterval = 0;
                entity.components.movable.directionElapsedInterval = 0;
            }
        }
        
    }

    function moveEntity(entity, elapsedTime, gridSize) { 
        entity.components.movable.elapsedInterval += elapsedTime;
        let splitSize = 32;
        
        if(entity.components.movable.elapsedInterval >= entity.components.movable.moveInterval){
            entity.components.movable.elapsedInterval = 0;
            if(entity.components.alligator){
                if(gator < 20){
                    entity.components.appearance.sprite = 1;
                }
                else if(gator < 100){
                    entity.components.appearance.sprite = 0;
                }
                else{
                    gator = 0;
                }
                gator++;
            }

            if (entity.components.turtle && entity.components.turtle.chosen){
                if(turtle < turtleInc){
                    entity.components.appearance.sprite = 0;
                }
                else if(turtle>=turtleInc && turtle<turtleInc*2){
                    entity.components.appearance.sprite = 1;
                }
                else if(turtle>=turtleInc*2 && turtle<turtleInc*3){
                    entity.components.appearance.sprite = 2;
                }
                else if(turtle>=turtleInc*3 && turtle<turtleInc*5){
                    entity.components.appearance.sprite = 3;
                }
                else if(turtle>=turtleInc*5 && turtle<turtleInc*6){
                    entity.components.appearance.sprite = 2;
                }
                else if(turtle>=turtleInc*6 && turtle<turtleInc*7){
                    entity.components.appearance.sprite = 1;
                }
                else if(turtle>=turtleInc*7 && turtle<turtleInc*10){
                    entity.components.appearance.sprite = 0;
                }
                else{
                    turtle = 0;
                }
                turtle++;
            }

            switch (entity.components.movable.facing) {
                case Frogger.enums.Direction.Left:
                    move(entity, -1/splitSize, 0);
                    break;
                case Frogger.enums.Direction.Right:
                    move(entity, 1/splitSize, 0);
                    break;
            }
        }
    }

    // --------------------------------------------------------------
    //
    // Grind through all the entities and move the ones that can move.
    //
    // --------------------------------------------------------------
    function update(elapsedTime, entities, gridSize) {
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.frog){
                moveFrog(entity, elapsedTime, gridSize);
            }
            else if (entity.components.position && entity.components.movable) {
                moveEntity(entity, elapsedTime, gridSize);
            }
        }
    }

    let api = {
        update: update
    };

    return api;
}());


