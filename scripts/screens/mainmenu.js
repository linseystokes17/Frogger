Frogger.screens['main-menu'] = (function(game) {
    'use strict';
    
    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {
                game.showScreen('game-play');
                Frogger.assets.click.play(); 
            });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { 
                game.showScreen('high-scores'); 
                Frogger.assets.click.play();    
            });
        
        document.getElementById('id-settings').addEventListener(
            'click',
            function() { 
                game.showScreen('settings'); 
                Frogger.assets.click.play();    
            });
        
        document.getElementById('id-about').addEventListener(
            'click',
            function() { 
                game.showScreen('about');                 
                Frogger.assets.click.play();    
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
}(Frogger.game));
