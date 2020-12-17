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
    // image rendering
    // context.drawImage(
    //     image,
    //     sx, sy,
    //     sWidth, sHeight,
    //     dx * world.size + world.left, dy * world.size + world.top,
    //     dWidth * world.size, dHeight * world.size);

    //console.log(appearance.image);
    //console.log(components);
    graphics.core.drawImage(
        appearance.image,
        0, 0,
        40, 40,// sWidth, sHeight
        position.x / gridSize, // dx
        position.y / gridSize, // dy
        1 / (gridSize), 1 / (gridSize)
        //1.0 / gridSize, 1.0 / gridSize,  
    );

    

};
