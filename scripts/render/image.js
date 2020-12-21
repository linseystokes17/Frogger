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

    let appearance = components.appearance;
    let spritesheetIndex = components.appearance.index;
    let numSprites = components.appearance.numSprites;
    let spriteWidth = Math.round(components.appearance.image.width / numSprites);
    let spriteHeight = 40;
    let diff = 0;
    let newWidth = 0;
    let type = components.appearance.type;
    let spriteGridWidth = Math.round(spriteWidth / 40, 2);
    let newGridWidth = 0;

    if (type == 'frog'){
        let direction = components.movable.facing;
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

    // image rendering
    // context.drawImage(
    //     image,
    //     sx, sy,
    //     sWidth, sHeight,
    //     dx * world.size + world.left, dy * world.size + world.top,
    //     dWidth * world.size, dHeight * world.size);

    if (position.x + (spriteGridWidth) > gridSize-1){
        diff = (gridSize) - ((position.x) + spriteGridWidth); // -x
        newGridWidth = spriteGridWidth+diff; // 1-x
        newWidth = newGridWidth * spriteWidth; // 

        graphics.core.drawImage(
            appearance.image,
            spritesheetIndex, 0,
            newWidth, spriteHeight,// sWidth, sHeight
            gridSize-1, // dx
            position.y / gridSize, // dy
            (1 / (gridSize)) * (newGridWidth), 1 / (gridSize)
            //1.0 / gridSize, 1.0 / gridSize,  
        );
    } 
    if (position.x < 0){
        diff = position.x; // amount of overhang
        newGridWidth = (spriteGridWidth)+diff; // width is the old width + (neg) overhang
        newWidth = newGridWidth * spriteWidth;

        graphics.core.drawImage(
            appearance.image,
            spritesheetIndex*spriteWidth-diff*spriteWidth, 0,
            newWidth, spriteHeight,// sWidth, sHeight
            0, // dx
            position.y / gridSize, // dy
            (1 / (gridSize)) * (newGridWidth), 1 / (gridSize)
            //1.0 / gridSize, 1.0 / gridSize,  
        );
    }
    else{
        graphics.core.drawImage(
            appearance.image,
            spritesheetIndex*spriteWidth, 0,
            spriteWidth, spriteHeight,// sWidth, sHeight
            position.x / gridSize, // dx
            position.y / gridSize, // dy
            (1 / (gridSize)) * (spriteWidth/40), 1 / (gridSize)
            //1.0 / gridSize, 1.0 / gridSize,  
        );
    }
};
