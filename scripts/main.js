Frogger.screens['game-play'] = (function(graphics, components, model, game) {
    'use strict';
    let lastTimeStamp = performance.now();
    
    //------------------------------------------------------------------
    //
    // Update the simulation.
    //
    //------------------------------------------------------------------
    function update(elapsedTime, totalTime) {
        if(!Frogger.systems.keyboardInput.cancelNextRequest){
            model.update(elapsedTime, totalTime);
        }
        else if (Frogger.systems.keyboardInput.cancelNextRequest){
            model.update(elapsedTime, 0);
            // Then, return to the main menu
            game.showScreen('main-menu');
            model.reset(totalTime);
        }
    }

    //------------------------------------------------------------------
    //
    // Render the simulation.
    //
    //------------------------------------------------------------------
    function render(elapsedTime, time) {
        graphics.core.clearCanvas();
        graphics.core.saveContext();
        graphics.core.clip();
        graphics.core.restoreContext();
    }

    //------------------------------------------------------------------
    //
    // A game loop so we can show some animation with this demo.
    //
    //------------------------------------------------------------------
    function gameLoop(time) {
        // time, lastTimeStamp, elapsedTime
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        // LL processInput
        // This is the rendering to provide the game viewport, it has nothing to do
        // with the actual rendering of the game itself.
        render(elapsedTime, time);
        update(elapsedTime, time);

        if (!Frogger.systems.keyboardInput.cancelNextRequest) {
            Frogger.assets.music.play();
            requestAnimationFrame(gameLoop);
        }
        else{
            model.update(elapsedTime, 0);
            model.reset();
            Frogger.assets.music.pause();
            game.showScreen('main-menu');
        }
    }

    //------------------------------------------------------------------
    // This is the entry point for the demo.  From here the various event
    // listeners we care about are prepared, along with setting up the
    // canvas for rendering, finally starting the animation loop.
    //------------------------------------------------------------------
    function initialize() {
        console.log('game initializing...');

        graphics.core.initialize();
    }

    function run() {
        model.initialize();
        lastTimeStamp = performance.now();
        Frogger.systems.keyboardInput.cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize: initialize,
        run: run,
    };

}(Frogger.graphics, Frogger.components, Frogger.model, Frogger.game));
