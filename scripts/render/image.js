// Adding this to the Math object here, because it is used in this part of the
// rendering system
Math.lerp = (a, b, f) => { return a + f * (b - a); };

// --------------------------------------------------------------
//
// This function knows how to render any position component, rendering
// all of the segments it contains.
//
// --------------------------------------------------------------
Frogger.render.image = function (graphics, components, position, gridSize) {
    'use strict';

    // console.log('spriteWidth: ', spriteWidth);

    let worldSize = graphics.core.getWorldSize();
    let block = worldSize / gridSize;
    let appearance = components.appearance;
    let spritesheetIndex = components.appearance.index;
    let numSprites = components.appearance.numSprites;
    let spriteWidth = components.appearance.image.width / numSprites;
    let spriteHeight = components.appearance.image.height;
    let type = components.appearance.type;
    let direction = components.movable.facing;

    let newWidth = 0;
    let offsetRight = 0;
    let offsetLeft = 0;


    if (type == 'frog'){
        if (direction == 'up'){
            spritesheetIndex = 0;
        }
        if (direction == 'down'){
            spritesheetIndex = 4;
        }
        if (direction == 'left'){
            spritesheetIndex = 6;
        }
        if (direction == 'right'){
            spritesheetIndex = 2;
        }
    }

    if (position.x*block+spriteWidth >= worldSize){ // if sprite is longer than game
        offsetRight = (gridSize) - (position.x+(spriteWidth/block));
        offsetLeft = 0;
        //console.log('greater than world!');
    }
    else if (position.x < 0){
        offsetLeft = position.x;
        offsetRight = 0;
        //console.log('less than world!');
    }

    graphics.core.drawImage(
        appearance.image,
        spritesheetIndex*spriteWidth, 0,
        spriteWidth+(offsetRight), spriteHeight,// sWidth, sHeight
        (offsetLeft + position.x) / gridSize, // dx
        position.y / gridSize, // dy
        (spriteWidth/worldSize), 1 / (gridSize)
        //1.0 / gridSize, 1.0 / gridSize,  
    );
        
};
