// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Midterm.model = (function(components, graphics, assets) {
    'use strict';
    let that = {};
    let entities = {};  // key is 'id', value is an Entity
    let totalMoves = 0;
    let tile = null;
    let world = graphics.core.getWorldSize();
    let inputSpec = { keys: {
        'ArrowLeft': Midterm.enums.Direction.Left,
        'ArrowRight': Midterm.enums.Direction.Right,
        'ArrowUp': Midterm.enums.Direction.Up,
        'ArrowDown': Midterm.enums.Direction.Down,
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
        let currTileId = 0;
        world = graphics.core.getWorldSize();
        Object.keys(entities).forEach(key => {
            let entity = entities[key].components.image;
            let ent = entities[key];
            let xRange = [entity.x * world.size + world.left, entity.x * world.size + world.left + entity.spriteWidth];
            let yRange = [entity.y * world.size+world.top, entity.y * world.size + entity.spriteHeight+world.top];

            if (x < xRange[1] && x > xRange[0] && y < yRange[1] && y > yRange[0]){
                console.log('clicked on: ', ent.id);
                currTileId = ent.id
            }
        });

        return currTileId;
    }

    that.moveTile = function(x, y){
        let currTileId = getTile(x, y);
        let clickedEntity = entities[currTileId];
        
        console.log('moveTile: ', clickedEntity);

        // empty square does not report a clicked on

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

    function shuffle(sourceArray) {
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
    

    that.initialize = function(type) {
        let count = 0;

        if (type == 'easy'){
            let keys = shuffle(Object.keys(Midterm.assets128));
            let numTiles = 15;
            while(count < numTiles){
                let key = keys[count];

                tile = createTileEntity(key, Midterm.assets128[key], 4, count)
                entities[tile.id] = tile;
                count++;
            }
            // an easy game is tile128 image array, randomized with bottom right empty
        }
        else if(type == 'hard'){
            Object.keys(Midterm.assets64).forEach(key => {
                tile = createTileEntity(key, Midterm.assets64[key], 8)
                entities[tile.id] = tile;
            });
        }
    };

    that.reset = function(){
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

}(Midterm.components, Midterm.graphics, Midterm.assets));
