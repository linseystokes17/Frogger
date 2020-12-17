// Adding this to the Math object here, because it is used in this part of the
// rendering system
Math.lerp = (a, b, f) => { return a + f * (b - a); };

// --------------------------------------------------------------
//
// This function knows how to render any position component, rendering
// all of the segments it contains.
//
// --------------------------------------------------------------
Frogger.render.image = function (graphics, appearance, position, gridSize) {
    'use strict';

    graphics.core.drawSquare({
        x: position.x / gridSize,
        y: position.y / gridSize
    },
        1.0 / gridSize,
        appearance.fill,
        appearance.stroke
    );

};
