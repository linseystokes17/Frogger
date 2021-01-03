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
                entity.components.image.x += xIncrement/split;
                entity.components.image.y += yIncrement/split;
                count++;
                entity.components.image.active = false;
            }
        }, 1000/split);

        entity.components.image.direction = Midterm.enums.Direction.Stopped;
    }


    function moveEntity(entity, elapsedTime) { 
        entity.components.image.elapsedInterval += elapsedTime;

        // move the entity in the direction of empty square, 
        // if square is not empty (aka collision), do nothing
        switch (entity.components.image.direction){
            case Midterm.enums.Direction.Right:
                move(entity, entity.components.image.width, 0);
                entity.components.image.elapsedInterval = 0;
                entity.position++;
                break;

            case Midterm.enums.Direction.Left:
                move(entity, -entity.components.image.width, 0);
                entity.components.image.elapsedInterval = 0;
                entity.position--;
                break;

            case Midterm.enums.Direction.Up:
                move(entity, 0, -entity.components.image.height);
                entity.components.image.elapsedInterval = 0;
                entity.position = entity.position-4;
                break;

            case Midterm.enums.Direction.Down:
                move(entity, 0, entity.components.image.height);
                entity.components.image.elapsedInterval = 0;
                entity.position = entity.position+4;
                break;
        }
    }

    function checkOrder(entities){
        let order = [];
        let count = 0;
        for (let id in entities) {
            let entity = entities[id];
            order.push(entity.position);
        }

        for (let i = 0; i < order.length; i++) {
            if (order[i] == i) {
                let entity = entities[i];
                if(!entity.components.image.active){
                    entity.components.image.active = true;
                    entity.components.image.continueActive = true;    
                }
                count++;
            }
        }
        if(count == order.length){
            return true;
        }
        
        return false;
    }

    // --------------------------------------------------------------
    // Grind through all the entities and move the ones that can move.
    // -------------------------------------------------------------
    function update(elapsedTime, entities, reportEvent) {
        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.image) {
                moveEntity(entity, elapsedTime);
            }
        }
        if(checkOrder(entities)){
            Midterm.systems.mouseInput.cancelNextRequest = true;
            reportEvent({
                type: Midterm.enums.EventGameOver,
            })
        }
        
    }

    let api = {
        update: update,
    };

    return api;
}());


