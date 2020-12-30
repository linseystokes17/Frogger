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
    let buffer = 0;
    let bufferPixel = 0;

    that.render = function(sprite) {
        // 3 drawImage version, left cut off, right cut off, full image
        // left cut off (+buffer to index position, -buffer from width, +buffer to game position)
        // if(sprite.position.x < 0){
        //     let pixelWidth = sprite.appearance.pixelWidth;
        //     buffer = sprite.position.x;
        //     if(buffer <= -sprite.appearance.width*15){
        //         buffer = -sprite.appearance.width*15;
        //     }
        //     bufferPixel = buffer*pixelWidth;

        //     graphics.core.drawImage(
        //         sprite.appearance.spriteSheet,
        //         (sprite.appearance.pixelWidth * sprite.appearance.sprite)-(bufferPixel), 0,    // Which sprite to pick out
        //         sprite.appearance.pixelWidth+(bufferPixel), sprite.appearance.pixelHeight,    // The size of the sprite in the sprite sheet
        //         0,        // Where to draw the sprite
        //         sprite.position.y/15,
        //         ((sprite.appearance.width*15)+buffer)/15, sprite.appearance.height);
        // } 

        // // right cut off (-excess from image width)
        // else if(sprite.position.x+sprite.appearance.width*15 >= 15){
        //     let pixelWidth = sprite.appearance.pixelWidth;
        //     buffer = 15 - (sprite.position.x+sprite.appearance.width*15);
        //     if(buffer >= sprite.appearance.width*15){
        //         buffer = sprite.appearance.width*15;
        //     }
        //     bufferPixel = buffer*pixelWidth;

        //     console.log("((sprite.appearance.width*15)+buffer)/15: ", ((sprite.appearance.width*15)+buffer)/15);

        //     graphics.core.drawImage(
        //         sprite.appearance.spriteSheet,
        //         (sprite.appearance.pixelWidth * sprite.appearance.sprite), 0,    // Which sprite to pick out
        //         sprite.appearance.pixelWidth-(bufferPixel), sprite.appearance.pixelHeight,    // The size of the sprite in the sprite sheet
        //         sprite.position.x/15,        // Where to draw the sprite
        //         sprite.position.y/15,
        //         sprite.appearance.width-buffer/15, sprite.appearance.height);
        // }
        // else{
            graphics.core.drawImage(
                sprite.appearance.spriteSheet,
                sprite.appearance.pixelWidth * sprite.appearance.sprite, 0,    // Which sprite to pick out
                sprite.appearance.pixelWidth, sprite.appearance.pixelHeight,    // The size of the sprite in the sprite sheet
                sprite.position.x/15,        // Where to draw the sprite
                sprite.position.y/15,
                sprite.appearance.width, sprite.appearance.height);
        // }
    };

    return that;
        
}(Frogger.graphics));
