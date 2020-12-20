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
    let spriteWidth = 40;
    let spriteHeight = 40;
    let diff = 0;

    if (components.appearance.type == 'frog'){
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

    if (components.appearance.type == 'car'){
        spritesheetIndex = components.appearance.index;
    }

    if (components.appearance.type == 'truck'){
        spriteWidth = 61;
    }

    if (components.appearance.type == 'alligator'){
        spritesheetIndex = components.appearance.index;
        spriteWidth = 100;
        if (position.x + (spriteWidth/40) > gridSize){
            diff = (gridSize*40) - position.x + (spriteWidth/40)
            spriteWidth -= diff;
        }
    }

    if (components.appearance.type == 'log'){
        spriteWidth = components.appearance.image.width;
    }

    if (components.appearance.type == 'bonus'){
        spriteWidth = 40;
        spritesheetIndex = 2;
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
        spritesheetIndex*spriteWidth, 0,
        spriteWidth, spriteHeight,// sWidth, sHeight
        position.x / gridSize, // dx
        position.y / gridSize, // dy
        (1 / (gridSize)) * (spriteWidth/40), 1 / (gridSize)
        //1.0 / gridSize, 1.0 / gridSize,  
    );

    

};
