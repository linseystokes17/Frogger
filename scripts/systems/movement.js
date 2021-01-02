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
    let count = 0;
    let nextSprite = 0;

    // --------------------------------------------------------------
    //
    // This handles the logic of moving the front of the entity, along
    // with adding segments as necessary during the move.
    //
    // --------------------------------------------------------------
    function move(entity, xIncrement, yIncrement) {
        let numGrids = -5 // 5 'block' buffer on each side
        let gridSize = 15;
        let width = entity.components.appearance.width;
       
        if (entity.components.position.x+xIncrement >= gridSize-numGrids){
            entity.components.position.x = numGrids;
        }
        if (entity.components.position.x+(xIncrement) <= numGrids){
            entity.components.position.x = gridSize-numGrids;
        }

        // the only part frog should use
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
        let runTime = entity.components.movable.moveInterval+entity.components.movable.animationInterval;
        entity.components.movable.elapsedInterval += elapsedTime;

        if(entity.components.movable.canMove){ // if the frog canMove (not dead or in animation)
            // if keyPressed & elapsedInterval > animationTime
            // ensure that y is an integer when we want the frog to move
            entity.components.position.y = Math.round(entity.components.position.y);

            if (entity.components.keyboard.keyPressed && entity.components.movable.elapsedInterval > runTime){
                Frogger.assets.hop.play();
                switch (entity.components.movable.facing) {
                    case Frogger.enums.Direction.Up:
                        entity.components.appearance.sprite = 1;
                        move(entity, 0, -1/splitSize);
                        break;
                    case Frogger.enums.Direction.Down:
                        entity.components.appearance.sprite = 5;
                        move(entity, 0, 1/splitSize);
                        break;
                    case Frogger.enums.Direction.Left:
                        entity.components.appearance.sprite = 7;
                        move(entity, -1/splitSize, 0);
                        break;
                    case Frogger.enums.Direction.Right:
                        entity.components.appearance.sprite = 3;
                        move(entity, 1/splitSize, 0);
                        break;
                };

                entity.components.movable.elapsedInterval = 0;
                entity.components.keyboard.keyPressed = false;
                entity.components.movable.canMove = false;
                entity.components.movable.riding = false;
                entity.components.movable.direction = Frogger.enums.Direction.Stopped;
                entity.components.movable.directionInterval = 0;
                entity.components.movable.directionElapsedInterval = 0;


                count++;
            }
            
            // if frog is on a log, move with log
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
                    entity.components.collision.objectRiding = null;
                    entity.components.movable.direction = Frogger.enums.Direction.Stopped;
                    entity.components.movable.directionInterval = 0;
                    entity.components.movable.directionElapsedInterval = 0;
                }
            }
        }
        else if(entity.components.movable.elapsedInterval < entity.components.movable.animationInterval && !entity.components.movable.canMove){
            if(count < splitSize && !entity.components.collision.killed){
                switch (entity.components.movable.facing) {
                    case Frogger.enums.Direction.Up:
                        entity.components.appearance.sprite = 1;
                        move(entity, 0, -1/splitSize);
                        break;
                    case Frogger.enums.Direction.Down:
                        entity.components.appearance.sprite = 5;
                        move(entity, 0, 1/splitSize);
                        break;
                    case Frogger.enums.Direction.Left:
                        entity.components.appearance.sprite = 7;
                        move(entity, -1/splitSize, 0);
                        break;
                    case Frogger.enums.Direction.Right:
                        entity.components.appearance.sprite = 3;
                        move(entity, 1/splitSize, 0);
                        break;
                };
                count++;
            }
            else{
                count = 0;
                entity.components.movable.canMove = true;

                switch (entity.components.movable.facing) {
                    case Frogger.enums.Direction.Up:
                        entity.components.appearance.sprite = 0;
                        break;
                    case Frogger.enums.Direction.Down:
                        entity.components.appearance.sprite = 4;
                        break;
                    case Frogger.enums.Direction.Left:
                        entity.components.appearance.sprite = 6;
                        break;
                    case Frogger.enums.Direction.Right:
                        entity.components.appearance.sprite = 2;
                        break;
                };
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
                else if(gator < 200){
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
    // Grind through all the entities and move the ones that can move.
    // -------------------------------------------------------------
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


