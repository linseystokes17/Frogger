Midterm.screens['main-menu'] = (function(game) {
    'use strict';
    
    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {
                game.showScreen('game-play');
                Midterm.assets.click.play(); 
            });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { 
                game.showScreen('high-scores'); 
                Midterm.assets.click.play();    
            });
        
        document.getElementById('id-settings').addEventListener(
            'click',
            function() { 
                game.showScreen('settings'); 
                Midterm.assets.click.play();    
            });
        
        document.getElementById('id-about').addEventListener(
            'click',
            function() { 
                game.showScreen('about');                 
                Midterm.assets.click.play();    
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
