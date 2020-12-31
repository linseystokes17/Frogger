// --------------------------------------------------------------
//
// This system handles collision detection for dead components
// against anything else in the game.  It also exposes a collision
// detection function that allows the game model to test if a
// proposed entity collides with any other (collidable) entity.
//
// --------------------------------------------------------------
Midterm.systems.collision = (function () {
    'use strict';

    // --------------------------------------------------------------
    //
    // Returns a collection of all the dead entities.
    //
    // --------------------------------------------------------------
    function findDead(entities) {
        let dead = [];
        for (let id in entities) {
            let entity = entities[id];
            if (!entity.components.collision.alive && entity.components.position) {
                dead.push(entity);
            }
        }

        return dead;
    }

    // --------------------------------------------------------------
    //
    // We know that only the snake is moving and that we only need
    // to check its head for collision with other entities.  Therefore,
    // don't need to look at all the segments in the position, with the
    // exception of the dead itself...a dead can collide with itself.
    //
    // --------------------------------------------------------------
    function collides(a, b) {
        let posA = a.components.position;
        let posB = b.components.position;

        let widthA = a.components.appearance.width;
        let widthB = b.components.appearance.width;

        let heightB = b.components.appearance.height;
        let heightA = a.components.appearance.height;

        let posABotRight = {
            x : posA.x + widthA,
            y : posA.y + heightA
        };
        let posBBotRight = {
            x : posB.x + widthB,
            y : posB.y + heightB
        };

        // if A top left.x < B bottom right.x
        // if A bottom right.x > B top left.x
        if(posA.x < posBBotRight.x && posABotRight.x > posB.x && posA.y < posBBotRight.y && posABotRight.y > posB.y){   
            return true;
        }
        return false;
    }

    // --------------------------------------------------------------
    //
    // Public interface that allows an entity with a single cell position
    // to be tested for collision with anything else in the game.
    //
    // --------------------------------------------------------------
    function collidesWithAny(proposed, entities) {

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.collision && entity.components.position) {
                collides(proposed, entity);
            }
        }

        return false;
    }

    // --------------------------------------------------------------
    //
    // Check to see if any dead components collide with any other
    // collision components.
    //
    // Step 1: find all dead components first
    // Step 2: Test the dead components for collision with other (but not self) collision components
    //
    // --------------------------------------------------------------
    function update(elapsedTime, totalTime, entities, reportEvent) {
        let dead = findDead(entities);

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.player) {
                for (let m = 0; m < dead.length; m++) {
                    let entityDead = dead[m];
                    if (collides(entity, entityDead)) {
                        // If home, that's okay
                        reportEvent({
                            type: Midterm.enums.Event.ReachHome,
                            entity: entity,
                            hitEntity: entityDead
                        });
                    } 
                }
            }
        }
    }

    let api = {
        update: update,
        collidesWithAny: collidesWithAny
    };

    return api;
}());
