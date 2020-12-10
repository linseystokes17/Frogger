LunarLander.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function label(fuel, velocity, angle){
        let angleMax = 355;
        let angleMin = 5;
        let speedMax = .3
        let degrees = Math.round(((angle* 180/Math.PI)+360)%360);
        context.font = '20px Calibri';
        let inc = 20;

        if (fuel > 0){
            context.fillStyle = 'white';
            context.fillText("fuel: " + fuel, 0, inc);
        }
        else if (fuel <= 0){
            context.fillStyle = 'red';
            context.fillText("fuel: " + fuel, 0, inc);
        }

        if (velocity.y >= speedMax){
            context.fillStyle = 'white';
            context.fillText("velocity: " + Math.floor(velocity.y*10) + " m/s", 0, inc*2 );
        }
        else if (velocity.y < speedMax){
            context.fillStyle = 'green';
            context.fillText("velocity: " + Math.floor(velocity.y*10) + " m/s", 0, inc*2);
        }
        
        if (degrees <= angleMin || degrees >= angleMax){
            context.fillStyle = 'green';
            context.fillText("Angle: " + (degrees), 0, inc*3);
        }
        else {
            context.fillStyle = 'white';
            context.fillText("Angle: " + (degrees), 0, inc*3);
        }
    }


    function drawTerrain(points, len){
        context.beginPath()
        for (var i=0; i < len-1; i++){
            var start = points[i];
            var end = points[i+1];
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.lineWidth = 2;
            context.stroke();
        }
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, angle, size, velocity) {
        context.save();

        center.x += velocity.x;
        center.y += velocity.y;

        context.translate(center.x, center.y);
        context.rotate(angle);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);

        context.restore();
    }

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        label: label,
        drawTerrain: drawTerrain,
    };

    return api;
}());
