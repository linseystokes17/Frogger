// Adding this to the Math object here, because it is used in this part of the
// rendering system
Math.lerp = (a, b, f) => { return a + f * (b - a); };

// --------------------------------------------------------------
//
// This function knows how to render any position component, rendering
// all of the segments it contains.
//
// --------------------------------------------------------------
Frogger.graphics.Image = (function (graphics) {
    'use strict';
    let that = {};

    that.render = function(sprite) {
        graphics.core.drawImage(
            sprite.appearance.spriteSheet,
            sprite.appearance.pixelWidth * sprite.appearance.sprite, 0,    // Which sprite to pick out
            sprite.appearance.pixelWidth, sprite.appearance.pixelHeight,    // The size of the sprite in the sprite sheet
            sprite.position.x/15,        // Where to draw the sprite
            sprite.position.y/15,
            sprite.appearance.width, sprite.appearance.height);
    };

    return that;
        
}(Frogger.graphics));
