Midterm.screens['game-play'] = (function(graphics, components, model, game, systems) {
    'use strict';
    let lastTimeStamp = performance.now();
    let myMouse = systems.mouseInput();
    let textGameOver = components.Text({
        text : 'GameOver',
        font : '32px Arial, sans-serif',
        fill : 'rgba(50, 10, 50, 1)',
        position : { x : 0, y : .5 }
    });
    
    function processInput(elapsedTime) {
        myMouse.update(elapsedTime);
    }

    //------------------------------------------------------------------
    //
    // Update the simulation.
    //
    //------------------------------------------------------------------
    function update(elapsedTime, totalTime) {
        if(!Midterm.systems.mouseInput.cancelNextRequest){
            model.update(elapsedTime, totalTime);
            //myMouse.update(elapsedTime)
        }
        else if (Midterm.systems.mouseInput.cancelNextRequest){
            // Then, return to the main menu
            game.showScreen('main-menu');
            
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
        processInput(elapsedTime);

        render(elapsedTime, time);
        update(elapsedTime, time);

        if (!systems.mouseInput.cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
        else{
            renderOver(time);
            setTimeout(function(){
                game.showScreen('main-menu');
            }, 5000);
        }
    }

    function renderOver(time){
        graphics.core.clearCanvas();

        textGameOver.height = graphics.core.measureTextHeight(textGameOver);
        textGameOver.width = graphics.core.measureTextWidth(textGameOver);

        textGameOver.text = 'Game Over! ElapsedTime: '+ time/1000;

        graphics.Text.render(textGameOver);
    }

    //------------------------------------------------------------------
    // This is the entry point for the demo.  From here the various event
    // listeners we care about are prepared, along with setting up the
    // canvas for rendering, finally starting the animation loop.
    //------------------------------------------------------------------
    function initialize() {
        graphics.core.initialize();

        if(!Midterm.systems.mouseInput.cancelNextRequest){
            myMouse.registerHandler(function(event) {
                let pressed = graphics.core.clientToWorld(event.clientX,  event.clientY);
                //console.log('pressed: ', pressed);

                model.moveTile(pressed.x, pressed.y);
                },myMouse.EventMouseDown
            );
        }
    }

    function run(type) {
        model.initialize(type);
        lastTimeStamp = performance.now();
        Midterm.systems.mouseInput.cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize: initialize,
        run: run,
    };

}(Midterm.graphics, Midterm.components, Midterm.model, Midterm.game, Midterm.systems));
