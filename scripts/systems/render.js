// --------------------------------------------------------------
//
// This system is responsible for renderign the whole game, which
// is just the background and the entities with a appearance
// and position components.
//
// --------------------------------------------------------------
Frogger.systems.render = (function (graphics) {
    'use strict';

    // --------------------------------------------------------------
    //
    // Find all the entities with both appearance and position components
    // and render them as segmented.
    //
    // --------------------------------------------------------------
    function renderEntities(entities, gridSize) {
        for (let id in entities) {
            let entity = entities[id];
            //console.log(entity);
            Frogger.render.image(graphics, entity.components.appearance, entity.components.position, gridSize);
        }
    } // Will probs be TODO

    // --------------------------------------------------------------
    //
    // Public interface used to get the whole game rendered.
    //
    // --------------------------------------------------------------
    function update(elapsedTime, entities, gridSize) {
        // Something is wrong here, TODO
        Frogger.render.background(graphics);
        renderEntities(entities, gridSize);
    }

    let api = {
        update: update
    };

    return api;
}(Frogger.graphics));
