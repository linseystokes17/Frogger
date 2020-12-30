Frogger.graphics.Frog = (function (graphics) {
    'use strict';
    let that = {};
    let index = 8;

    that.render = function(frog) {
        let numLives = frog.collision.numLives;

        if(frog.position.y > 6){
            frog.collision.riding = false;
            frog.movable.direction = Frogger.enums.Direction.Stopped;
            frog.movable.directionInterval = 0;
            frog.movable.directionElapsedInterval = 0;
        } else if (frog.position.y <= 6 && frog.position.y > 1){
            if(!frog.collision.riding && !frog.collision.home){
                Frogger.assets.plunk.play();
                frog.collision.killed = true;
            }
        }

        if(frog.collision.killed){
            frog.movable.canMove = false;
            if(index == 8){
                Frogger.assets.squash.play();
            }
            frog.appearance.facing = Frogger.enums.Direction.Stopped;
            frog.appearance.sprite = index;
            if (frog.movable.elapsedInterval > 500){
                index++;
                frog.movable.elapsedInterval = 0;
            }

            if (index >= frog.appearance.spriteCount){
                frog.collision.killed = false;
                frog.position.x = 15/2;
                frog.position.y = 13;
                frog.appearance.sprite = 0;
                index = 8;
                frog.movable.canMove = true;
            }

            numLives--;
            frog.collision.numLives = numLives;
        }
        
        else if (frog.collision.home){
            Frogger.assets.extra.play();
            frog.position.x = 15/2;
            frog.position.y = 13;
            frog.appearance.sprite = 0;
            frog.appearance.facing = Frogger.enums.Direction.Stopped;
            frog.collision.home = false;
        }
        
        else{
            switch (frog.movable.facing) {
                case Frogger.enums.Direction.Up:
                    frog.appearance.sprite = 0;
                    break;
                case Frogger.enums.Direction.Down:
                    frog.appearance.sprite = 4;
                    break;
                case Frogger.enums.Direction.Left:
                    frog.appearance.sprite = 6;
                    break;
                case Frogger.enums.Direction.Right:
                    frog.appearance.sprite = 2;
                    break;
            };
        }

        graphics.core.drawImage(
            frog.appearance.spriteSheet,
            frog.appearance.pixelWidth * frog.appearance.sprite, 0,    // Which sprite to pick out
            frog.appearance.pixelWidth, frog.appearance.pixelHeight,    // The size of the sprite in the sprite sheet
            frog.position.x/15,        // Where to draw the sprite
            frog.position.y/15,
            frog.appearance.width, frog.appearance.height);
    
    };

    return that;
        
}(Frogger.graphics));