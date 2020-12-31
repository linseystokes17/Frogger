// Adding this to the Math object here, because it is used in this part of the
// rendering system
Math.lerp = (a, b, f) => { return a + f * (b - a); };

// --------------------------------------------------------------
//
// This function knows how to render any position component, rendering
// all of the segments it contains.
//
// --------------------------------------------------------------
Midterm.graphics.Image = (function (graphics) {
    'use strict';
    let that = {};

    that.render = function(sprite) {
        console.log('sprite: ', sprite);
        
        graphics.core.drawImage(
            sprite.image.image,
            0, 0,    // Which sprite to pick out
            sprite.image.spriteWidth, sprite.image.spriteHeight,    // The size of the sprite in the sprite sheet
            sprite.image.x,        // Where to draw the sprite
            sprite.image.y,
            sprite.image.width, sprite.image.height);
        graphics.core.drawSquare(
            {x: sprite.image.x, y: sprite.image.y},
            sprite.image.width,
            'rgb(0,0,0,0)',
            'rgb(255,255,255)'
        );
    };

    return that;
        
}(Midterm.graphics));
