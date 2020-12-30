// Adding this to the Math object here, because it is used in this part of the

Frogger.graphics.River = (function (graphics) {
    'use strict';
    let that = {};

    that.render = function(gridSize) {
        graphics.core.drawRectangle('rgb(0, 50, 100)', 0,  1 / gridSize, 1, 6 / gridSize); // gridsize = 8 + 5 + 1 = 14
    
        for(var i=0; i<15; i++){
            let mod = i%3;
            if (mod!=1){
                graphics.core.drawSquare({ x: i/gridSize, y: 1/gridSize }, 1/gridSize, 'rgb(10, 100, 80)'); 
            }
        }
    };

    return that;
        
}(Frogger.graphics));
