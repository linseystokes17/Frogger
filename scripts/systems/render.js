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
            
            if (entity.components.frog){
                Frogger.graphics.Frog.render(entity.components);
            }
            Frogger.graphics.Image.render(entity.components);
        }
    } 

    function update(elapsedTime, entities, gridSize) {
        Frogger.render.background(graphics, gridSize);
        Frogger.graphics.River.render(gridSize);
        renderEntities(entities);
    }

    let api = {
        update: update
    };

    return api;
}(Frogger.graphics));
