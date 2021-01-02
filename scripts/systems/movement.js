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
        let split = 16;
        let count = 0;

        // movement animation (it slides)
        setInterval(function(){ 
            if(count == split){
                clearInterval();
            } 
            else{
                entity.image.x += xIncrement/split;
                entity.image.y += yIncrement/split;
                count++;
            }
        }, 1000/split);

        entity.image.direction = Midterm.enums.Direction.Stopped;
    }


    function moveEntity(entity, elapsedTime) { 
        entity.image.elapsedInterval += elapsedTime;
        // move the entity in the direction of empty square, 
        // if square is not empty (aka collision), do nothing
        switch (entity.image.direction){
            case Midterm.enums.Direction.Right:
                move(entity, entity.image.width, 0);
                entity.image.elapsedInterval = 0;
                break;

            case Midterm.enums.Direction.Left:
                move(entity, -entity.image.width, 0);
                entity.image.elapsedInterval = 0;
                break;

            case Midterm.enums.Direction.Up:
                move(entity, 0, -entity.image.height);
                entity.image.elapsedInterval = 0;
                break;

            case Midterm.enums.Direction.Down:
                move(entity, 0, entity.image.height);
                entity.image.elapsedInterval = 0;
                break;
        }
    }

    // --------------------------------------------------------------
    // Grind through all the entities and move the ones that can move.
    // -------------------------------------------------------------
    function update(elapsedTime, entities) {
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.image) {
                moveEntity(entity.components, elapsedTime);
            }
        }
    }

    let api = {
        update: update,
    };

    return api;
}());


