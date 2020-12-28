Frogger.screens['settings'] = (function(game, input) {
    'use strict';
    
    function initialize() {


        document.getElementById('id-settings-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
        
        document.getElementById('id-settings-forward').addEventListener(
            'click',
            function() { console.log('change forward setting'); });
        
        document.getElementById('id-settings-backward').addEventListener(
            'click',
            function() { console.log('change backward setting'); });

        document.getElementById('id-settings-right').addEventListener(
            'click',
            function() { console.log('change right setting'); });

        document.getElementById('id-settings-left').addEventListener(
            'click',
            function() { console.log('change left setting'); });
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
