// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Midterm.model = (function(components, graphics, assets, systems) {
    'use strict';
    let that = {};
    let entities = {};  // key is 'id', value is an Entity
    let totalMoves = 0;
    let tile = null;
    let world = graphics.core.getWorldSize();
    let inputSpec = { keys: {
        'Escape': Midterm.enums.Direction.Stopped
    }};

    const MOVE_INTERVAL = 500; // half second to move

    function createTileEntity(index, tiles, numTiles, count) {
        let curr = Midterm.assets[tiles.key];
        let id = curr.id;

        let x = (count % numTiles);
        let y = Math.floor(count / numTiles);
        tile = Midterm.Entity.createEntity(id);
        
        // image, width, height, x, y, direction, moveInterval, elapsedInterval
        tile.addComponent(components.Image({
            image: curr,
            spriteWidth: curr.width,
            spriteHeight: curr.height,
            width: 1/numTiles,
            height: 1/numTiles,
            x: x/numTiles, 
            y: y/numTiles,
            direction: Midterm.enums.Direction.Stopped, 
            moveInterval: MOVE_INTERVAL,
            elapsedInterval: 0, 
        }))
        // blankAdjacent
        tile.addComponent(components.Collision({blankAdjacent: false}));
        tile.addComponent(components.mouseInput(inputSpec));
        
        return tile;
    }

    function getTile(x, y){
        // return the id of the tile that was clicked on (at position x, y)
        let currTileId = null;
        world = graphics.core.getWorldSize();
        Object.keys(entities).forEach(key => {
            let entity = entities[key].components.image;
            let ent = entities[key];
            let xRange = [entity.x, entity.x + entity.width];
            let yRange = [entity.y, entity.y + entity.height];

            if (x < xRange[1] && x > xRange[0] && y < yRange[1] && y > yRange[0]){
                currTileId = ent.id
                return currTileId;
            }
        });

        return currTileId;
    }

    that.moveTile = function(x, y){
        let currTileId = getTile(x, y);
        let clickedEntity = entities[currTileId];
        if (clickedEntity!=null){// hasn't clicked on the blank square
            // can only move the tile if there is not a tile in one spot (of 4 possible)
            // check if there is a blank square adjacent
            let right = x + clickedEntity.components.image.width;
            let left = x - clickedEntity.components.image.width;
            let up = y - clickedEntity.components.image.height;
            let down = y + clickedEntity.components.image.height;

            let checkRightId = getTile(right, y);
            let checkLeftId = getTile(left, y);
            let checkUpId = getTile(x, up);
            let checkDownId = getTile(x, down);

            if (checkRightId == null && right < 1){
                clickedEntity.components.image.direction = Midterm.enums.Direction.Right;
                totalMoves++;
            }
            if (checkLeftId == null && left >= 0){
                clickedEntity.components.image.direction = Midterm.enums.Direction.Left;
                totalMoves++;
            }
            if (checkUpId == null && up >= 0){
                clickedEntity.components.image.direction = Midterm.enums.Direction.Up;
                totalMoves++;
            }
            if (checkDownId == null && down < 1){
                clickedEntity.components.image.direction = Midterm.enums.Direction.Down;
                totalMoves++;
            }
        }
    }

    // ------------------------------------------------------------------
    // Setup model & report events
    // ------------------------------------------------------------------
    function reportEvent(info) {
        switch (info.type) {
            case Midterm.enums.Event.ReachHome:
                console.log('Reach Home');
        }
    }

    function shuffle(sourceArray) { // shuffle the array of images, make sure no dupes
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));
    
            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];

            while (sourceArray.includes(temp) && sourceArray[i] != temp){
                sourceArray[j] = temp;
                j = i + Math.floor(Math.random() * (sourceArray.length - i));
                temp = sourceArray[j];
                sourceArray[j] = sourceArray[i];
            }

            sourceArray[i] = temp;            
        }
        return sourceArray;
    }

    // initialize main game objects, tiles
    that.initialize = function(type) {
        let count = 0;

        if (type == 'easy'){
            let keys = shuffle(Object.keys(Midterm.assets128));
            //let keys = Object.keys(Midterm.assets128);
            let numTiles = 15;
            while(count < numTiles){
                let key = keys[count];

                tile = createTileEntity(key, Midterm.assets128[key], 4, count)
                entities[tile.id] = tile;
                count++;
            }
            // an easy game is tile128 image array, randomized with bottom right empty
        }

        else if(type == 'hard'){ // will implement when tile64  images loaded in assets
            let keys = shuffle(Object.keys(Midterm.assets64));
            //let keys = Object.keys(Midterm.assets64);
            let numTiles = 63;
            while(count < numTiles){
                let key = keys[count];

                tile = createTileEntity(key, Midterm.assets64[key], 8, count)
                entities[tile.id] = tile;
                count++;
            }
        }
    };

    that.reset = function(){ // re-initialize tile positions, restart time/score
        console.log('reset model');
    }

    // ------------------------------------------------------------------
    // This function is used to update the state of the demo model.
    // ------------------------------------------------------------------
    that.update = function(elapsedTime, totalTime) {
        //Midterm.systems.mouseInput.update(elapsedTime, entities);
        Midterm.systems.movement.update(elapsedTime, entities);
        Midterm.systems.collision.update(elapsedTime, totalTime, entities, reportEvent);
        Midterm.systems.render.update(elapsedTime, totalTime, entities, totalMoves);
    };

    return that;

}(Midterm.components, Midterm.graphics, Midterm.assets, Midterm.systems));
