// --------------------------------------------------------------
//
// This system is responsible for renderign the whole game, which
// is just the background and the entities with a appearance
// and position components.
//
// --------------------------------------------------------------
Frogger.systems.render = (function (graphics) {
    'use strict';

    function renderEntities(entities) {
        for (let id in entities) {
            let entity = entities[id];
            
            Frogger.graphics.Image.render(entity.components);
            if (entity.components.frog){
                if (entity.components.movable.facing == 'up'){
                    entity.components.appearance.sprite = 0;
                }
                else if (entity.components.movable.facing == 'down'){
                    entity.components.appearance.sprite = 4;
                }
                else if (entity.components.movable.facing == 'left'){
                    entity.components.appearance.sprite = 6;
                }
                else if (entity.components.movable.facing == 'right'){
                    entity.components.appearance.sprite = 2;
                }
            }
        }
    } 

    function update(elapsedTime, entities, gridSize) {
        Frogger.render.background(graphics, gridSize);
        renderEntities(entities);
    }

    let api = {
        update: update
    };

    return api;
}(Frogger.graphics));
