// --------------------------------------------------------------
//
// This system handles collision detection for dead components
// against anything else in the game.  It also exposes a collision
// detection function that allows the game model to test if a
// proposed entity collides with any other (collidable) entity.
//
// --------------------------------------------------------------
Frogger.systems.collision = (function () {
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
            if (!entity.components.collision.alive && entity.components.movable && entity.components.position) {
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

        // If only the first segment needs to be tested, only test that segment
        let posA = a.components.position;
        let posB = b.components.position;

        let widthA = a.components.appearance.width;
        let widthB = b.components.appearance.width;

        let heightB = b.components.appearance.height;
        let heightA = a.components.appearance.height;


        if(posA.x+widthA <= posB.x || posA.y >= posB.y+heightB || posA.x >= posB.x+widthB || posA.y+heightA <= posB.y){
            return false;
        }
        else{
            return true;
        }
        // console.log('posA: ', posA);
        // console.log('posB: ', posB);
    }

    // --------------------------------------------------------------
    //
    // Public interface that allows an entity with a single cell position
    // to be tested for collision with anything else in the game.
    //
    // --------------------------------------------------------------
    function collidesWithAny(proposed, entities) {
        let aPosition = proposed.components.position;

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.collision && entity.components.position) {
                let ePosition = entity.components.position;
                if (aPosition.x === ePosition.x && aPosition.y === ePosition.y) {
                    return true;
                }
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
    function update(elapsedTime, entities, reportEvent) {
        let dead = findDead(entities);

        for (let id in entities) {
            let entity = entities[id];
            if (entity.components.collision && entity.components.position && entity.components.frog) {
                for (let m = 0; m < dead.length; m++) {
                    let entityDead = dead[m];
                    if (collides(entity, entityDead)) {
                        // If home, that's okay
                        if (entityDead.components.home) {
                            entity.components.movable.facing = Frogger.enums.Direction.Stopped;
                            reportEvent({
                                type: Frogger.enums.Event.ReachHome,
                                entity: entity
                            });
                            console.log('Hit something rideable');
                        } else if(entityDead.components.car){    // If anything else, not okay
                            entity.components.movable.facing = Frogger.enums.Direction.Stopped;
                            reportEvent({
                                type: Frogger.enums.Event.HitSomething,
                                entity: entity
                            });
                            console.log('Something killed me!');
                        }
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
