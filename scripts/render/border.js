//------------------------------------------------------------------
//
// Draws a blue background for the whole game-play area.
//
//------------------------------------------------------------------
Frogger.render.border = function (graphics, gridSize) {
    'use strict';
    let borderWidth = 5/15;

    for (var i = 0; i < gridSize+2; i++){
        // left side
        let posX = -borderWidth;
        let posY = i/gridSize  - borderWidth;
        graphics.core.drawSquare({ x: posX, y: posY }, borderWidth, 'rgb(100, 20, 100)', 'rgb(100, 20, 100)'); 
        
        // right side
        posX = 1;
        posY = i/gridSize  - borderWidth;
        graphics.core.drawSquare({ x: posX, y: posY }, borderWidth, 'rgb(100, 20, 100)', 'rgb(100, 20, 100)'); 

        // top
        posX = i/gridSize  -borderWidth;
        posY =  - borderWidth;
        graphics.core.drawSquare({ x: posX, y: posY }, borderWidth, 'rgb(100, 20, 100)', 'rgb(100, 20, 100)'); 

        // bottom
        posX = i/gridSize  - borderWidth;
        posY =  1;
        graphics.core.drawSquare({ x: posX, y: posY }, borderWidth, 'rgb(100, 20, 100)', 'rgb(100, 20, 100)'); 

    }
    
};
