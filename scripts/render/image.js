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

    let appearance = components.appearance
    let direction = components.movable.facing;
    let spritesheetIndex = 0;
    let spriteSize = 40;

    if (components.appearance.type == 'frog'){
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
    if (components.appearance.type == 'car'){
        spritesheetIndex = components.appearance.index;
    }

    // image rendering
    // context.drawImage(
    //     image,
    //     sx, sy,
    //     sWidth, sHeight,
    //     dx * world.size + world.left, dy * world.size + world.top,
    //     dWidth * world.size, dHeight * world.size);

    graphics.core.drawImage(
        appearance.image,
        spritesheetIndex*spriteSize, 0,
        spriteSize, spriteSize,// sWidth, sHeight
        position.x / gridSize, // dx
        position.y / gridSize, // dy
        1 / (gridSize), 1 / (gridSize)
        //1.0 / gridSize, 1.0 / gridSize,  
    );

    

};
