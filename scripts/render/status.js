Midterm.graphics.Status = (function (graphics, components) {
    'use strict';
    let that = {};
    let frameTimes = [];

    // Status will display the elapsed time and the number of moves
    let textFPS = components.Text({
        text : 'FPS',
        font : '16px Arial, sans-serif',
        fill : 'rgba(255, 255, 255, 1)',
        position : { x : 1.025, y : 0.00 }
    });

    let textTime = components.Text({
        text : 'Time',
        font : '16px Arial, sans-serif',
        fill : 'rgba(255, 255, 255, 1)',
        position : { x : 1.025, y : 0.05 }
    });

    let textMoves = components.Text({
        text : 'Moves',
        font : '16px Arial, sans-serif',
        fill : 'rgba(255, 255, 255, 1)',
        position : { x : 1.025, y : 0.1 }
    });

    that.render = function(elapsedTime, totalTime, totalMoves) {
        textFPS.height = graphics.core.measureTextHeight(textFPS);
        textFPS.width = graphics.core.measureTextWidth(textFPS);

        textTime.height = graphics.core.measureTextHeight(textTime);
        textTime.width = graphics.core.measureTextWidth(textTime);

        textMoves.height = graphics.core.measureTextHeight(textMoves);
        textMoves.width = graphics.core.measureTextWidth(textMoves);

        // Show FPS over last several frames
        frameTimes.push(elapsedTime);
        if (frameTimes.length > 50) {
            frameTimes = frameTimes.slice(1);
            let averageTime = frameTimes.reduce(function(a, b) { return a + b; }) / frameTimes.length;
            //
            // averageTime is in milliseconds, need to convert to seconds for frames per SECOND
            // But also want to preserve 1 digit past the decimal, so multiplying by 10000 first, then
            // truncating, then dividing by 10 to get back to seconds.
            let fps = Math.floor((1 / averageTime) * 10000) / 10;
            textFPS.text = 'FPS: ' + fps;
            graphics.Text.render(textFPS);
        }
        textTime.text = 'Time: ' + Math.round(totalTime/1000);
        textMoves.text = 'Moves: ' + totalMoves;
        
        graphics.Text.render(textTime);
        graphics.Text.render(textMoves);


    };

    return that;
        
}(Midterm.graphics, Midterm.components));
