//------------------------------------------------------------------
//
// Draws a blue background for the whole game-play area.
//
//------------------------------------------------------------------
Midterm.render.border = function (graphics) {
    'use strict';
    let borderWidth = 5/15;
    let color = 'rgb(50, 10, 50)'
    let gridSize = 15;

    for (var i = 0; i < gridSize+2; i++){
        // left side
        let posX = -borderWidth;
        let posY = i/gridSize  - borderWidth;
        graphics.core.drawSquare({ x: posX, y: posY }, borderWidth, color, color); 
        
        // right side
        posX = 1;
        posY = i/gridSize  - borderWidth;
        graphics.core.drawSquare({ x: posX, y: posY }, borderWidth, color, color); 

        // top
        posX = i/gridSize  -borderWidth;
        posY =  - borderWidth;
        graphics.core.drawSquare({ x: posX, y: posY }, borderWidth, color, color); 

        // bottom
        posX = i/gridSize  - borderWidth;
        posY =  1;
        graphics.core.drawSquare({ x: posX, y: posY }, borderWidth, color, color); 

    }
    
};
