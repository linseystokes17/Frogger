// --------------------------------------------------------------
//
// This system is responsible for renderign the whole game, which
// is just the background and the entities with an image
// and position components.
//
// --------------------------------------------------------------
Midterm.systems.render = (function (graphics, render) {
    'use strict';

    function renderEntities(entities, totalTime, elapsedTime) {
        for (let id in entities) {
            let entity = entities[id];
            //console.log('render entity: ', entity.components);
            graphics.Image.render(entity.components);
        }
    } 

    function update(elapsedTime, totalTime, entities, totalMoves) {
        render.background(graphics);
        renderEntities(entities, totalTime, elapsedTime);
        //render.border(graphics);
        graphics.Status.render(elapsedTime, totalTime, totalMoves);

    }

    let api = {
        update: update
    };

    return api;
}(Midterm.graphics, Midterm.render));
