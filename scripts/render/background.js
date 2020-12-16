//------------------------------------------------------------------
//
// Draws a blue background for the whole game-play area.
//
//------------------------------------------------------------------
Frogger.render.background = function (graphics) {
    'use strict';

    let size = graphics.core.getWorldSize();
    //console.log(size);
    let back = Frogger.assets.background;
    graphics.core.drawImage(back, 0, 0, 1, 1);
    //graphics.core.drawSquare({ x: 0, y: 0 }, 1, 'rgb(0, 0, 255)');
};
