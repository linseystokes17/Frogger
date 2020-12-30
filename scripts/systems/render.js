// --------------------------------------------------------------
//
// This system is responsible for renderign the whole game, which
// is just the background and the entities with a appearance
// and position components.
//
// --------------------------------------------------------------
Frogger.systems.render = (function (graphics, render) {
    'use strict';
    let numLives = 5;

    function renderEntities(entities, totalTime) {
        for (let id in entities) {
            let entity = entities[id];
            
            if (entity.components.frog){
                numLives = entity.components.collision.numLives;
                graphics.Frog.render(entity.components);
            }
            if (entity.components.home && entity.components.appearance.sprite!=2){
                let time = Math.round(totalTime/1000)%15;
                
                if(time == entity.components.home.changeInterval){
                    entity.components.appearance.sprite = 1;
                }
                else if(time == 15-entity.components.home.changeInterval+1){
                    entity.components.appearance.sprite = 0;
                }
                else{
                    entity.components.appearance.sprite = 3;
                }
            }
            graphics.Image.render(entity.components);
        }
    } 

    function update(elapsedTime, totalScore, totalTime, entities, gridSize) {
        render.background(graphics, gridSize);
        graphics.River.render(gridSize);
        renderEntities(entities, totalTime);
        render.border(graphics, gridSize);
        graphics.Status.render(elapsedTime, totalScore, totalTime, numLives);
    }

    let api = {
        update: update
    };

    return api;
}(Frogger.graphics, Frogger.render));
