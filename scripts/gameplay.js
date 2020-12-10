LunarLander.screens['game-play'] = (function(game, objects, renderer, graphics, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let myKeyboard = input.Keyboard();
    let count = 0;
    let myLander;
    let myTerrain;

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        for (let i = 0; i<myTerrain.points.length-1; i++){
            count = 0;
            if (myLander.lineCircleIntersection(myTerrain.points[i], myTerrain.points[i+1], myLander.getCenter()) == true){
                if ((myTerrain.points[i].y == myTerrain.points[i+1].y) && (Math.round(((myLander.angle* 180/Math.PI)+360)%360) <= 5 || Math.round(((myLander.angle* 180/Math.PI)+360)%360) >= 355) && (Math.abs(Math.floor(myLander.velocity.y*10)) <= 2)){
                    console.log("Successful landing!");
                    myLander.reset();
                    myTerrain.reset();
                    myTerrain.generateTerrain(1, 100);
                    count++;
                    if(count >= 2){
                        console.log('Congratulations! You won the game!');
                        cancelNextRequest = true;
                        myLander.reset();
                        myTerrain.reset();
                        game.showScreen('main-menu');
                    }
                }
                else{
                    console.log('You crashed!');
                    cancelNextRequest = true;
                    myLander.reset();
                    myTerrain.reset();
                    game.showScreen('main-menu');
                }
            }
        }
        myLander.updatePosition();
    }

    function render() {
        graphics.clear();
        graphics.label(myLander.fuel, myLander.velocity, myLander.angle);
        renderer.Terrain.render(myTerrain);
        renderer.Lander.render(myLander);
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        myLander = objects.Lander({
            imageSrc: 'assets/lander.png',
            center: { x: graphics.canvas.width / 2, y: 100 },
            size: { width: 15, height: 30 },
            velocity: {x: 0, y: 0},
            angle: Math.PI/2,
            thrust: 0,
            fuel: 20,
        });

        myTerrain = objects.Terrain({
            points: [],
            canv: {
                height: graphics.canvas.height, 
                width:graphics.canvas.width},
        });

        myKeyboard.register('ArrowUp', myLander.accelerate);
        myKeyboard.register('ArrowLeft', myLander.rotateLeft);
        myKeyboard.register('ArrowRight', myLander.rotateRight);
        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            myLander.reset();
            myTerrain.reset();
            
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

        let canvas = document.getElementById('id-canvas');
    }

    function run() {
        myTerrain.generateTerrain(2, 100);

        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(LunarLander.game, LunarLander.objects, LunarLander.render, LunarLander.graphics, LunarLander.input));
