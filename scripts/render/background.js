//------------------------------------------------------------------
//
// Draws a blue background for the whole game-play area.
//
//------------------------------------------------------------------
Frogger.render.background = function (graphics, gridSize) {
    'use strict';

    // one 'square'
    // let square = graphics.core.drawSquare({
    //     x: position.x / gridSize, // divide the position it's in by gridsize
    //     y: position.y / gridSize
    // },
    //     1.0 / gridSize,
    //     appearance.fill,
    //     appearance.stroke
    // );


    // Large Green
    graphics.core.drawSquare({ x: 0, y: 0 }, 1, 'rgb(0, 100, 10)'); 
    
    // Road
    graphics.core.drawRectangle('rgb(0, 0, 0)', 0, 8 / gridSize, 1, 5 / gridSize); // gridsize = 8 + 5 + 1 = 14
    
    // River
    graphics.core.drawRectangle('rgb(0, 50, 100)', 0,  1 / gridSize, 1, 6 / gridSize); // gridsize = 8 + 5 + 1 = 14

    for(var i=0; i<15; i++){
        let mod = i%3;
        if (mod!=1){
            graphics.core.drawSquare({ x: i/gridSize, y: 1/gridSize }, 1/gridSize, 'rgb(10, 100, 80)'); 
        }
    }
};
