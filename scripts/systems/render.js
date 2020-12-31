// --------------------------------------------------------------
//
// This system is responsible for renderign the whole game, which
// is just the background and the entities with a appearance
// and position components.
//
// --------------------------------------------------------------
Midterm.systems.render = (function (graphics, render) {
    'use strict';
    let numLives = 5;

    function renderEntities(entities, totalTime, elapsedTime) {
        for (let id in entities) {
            let entity = entities[id];
            graphics.Image.render(entity.components);
        }
    } 

    function update(elapsedTime, totalTime, entities) {
        render.background(graphics);
        renderEntities(entities, totalTime, elapsedTime);
        render.border(graphics);
        graphics.Status.render(elapsedTime, totalTime, numLives);

    }

    let api = {
        update: update
    };

    return api;
}(Midterm.graphics, Midterm.render));
