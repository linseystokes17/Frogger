// Frogger.screens['game-play'] = (function(game,  graphics, input, model) {
//     'use strict';

//     let lastTimeStamp = performance.now();
//     let myKeyboard = input.Keyboard();    

//     function processInput(elapsedTime) {
//         myKeyboard.update(elapsedTime);
//     }

//     function update(elapsedTime) {
//         model.update(elapsedTime);
//         if (model.cancelNextRequest == true){
//             model.reset();
            
//             //
//             // Then, return to the main menu
//             game.showScreen('main-menu');
//         }
//     }

//     function render() {
//         graphics.clear();
//         model.render();
//     }

//     function gameLoop(time) {
//         let elapsedTime = time - lastTimeStamp;
//         lastTimeStamp = time;

//         processInput(elapsedTime);
//         update(elapsedTime);
//         render();

//         if (!model.cancelNextRequest) {
//             requestAnimationFrame(gameLoop);
//         }
//     }

//     function initialize() {
//         console.log('game initializing...');
//         model.initialize();

//         myKeyboard.register('Escape', function() {
//             //
//             // Stop the game loop by canceling the request for the next animation frame
//             model.cancelNextRequest = true;
//             model.reset();
            
//             //
//             // Then, return to the main menu
//             game.showScreen('main-menu');
//         });
//     }

//     function run() {
//         //model.initialize();
//         lastTimeStamp = performance.now();
//         model.cancelNextRequest = false;
//         requestAnimationFrame(gameLoop);
//     }

//     return {
//         initialize : initialize,
//         run : run
//     };

// }(Frogger.game, Frogger.graphics, Frogger.input, Frogger.model));
