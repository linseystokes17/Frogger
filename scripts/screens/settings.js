Frogger.screens['settings'] = (function(game, input) {
    'use strict';
    
    function initialize() {


        document.getElementById('id-settings-back').addEventListener(
            'click',
            function() { 
                game.showScreen('main-menu'); 
                Frogger.assets.click.play();    
            });
        
        document.getElementById('id-settings-forward').addEventListener(
            'click',
            function() { 
                console.log('change forward setting'); 
                Frogger.assets.click.play();    
            });
        
        document.getElementById('id-settings-backward').addEventListener(
            'click',
            function() { 
                console.log('change backward setting'); 
                Frogger.assets.click.play();    
            });

        document.getElementById('id-settings-right').addEventListener(
            'click',
            function() { 
                console.log('change right setting'); 
                Frogger.assets.click.play();    
            });

        document.getElementById('id-settings-left').addEventListener(
            'click',
            function() { 
                console.log('change left setting'); 
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
}(Frogger.game, Frogger.input));
