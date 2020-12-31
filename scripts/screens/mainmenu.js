Midterm.screens['main-menu'] = (function(game) {
    'use strict';
    
    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-easy-game').addEventListener(
            'click',
            function() {
                game.showGameScreen('game-play', 'easy');
            });

        document.getElementById('id-hard-game').addEventListener(
            'click',
            function() {
                game.showGameScreen('game-play', 'hard');
            });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { 
                game.showScreen('high-scores'); 
            });
        
        document.getElementById('id-about').addEventListener(
            'click',
            function() { 
                game.showScreen('about');                 
            });
    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(Midterm.game));
