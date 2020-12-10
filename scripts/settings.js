LunarLander.screens['settings'] = (function(game, input) {
    'use strict';
    
    function initialize() {


        document.getElementById('id-settings-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(LunarLander.game, LunarLander.input));
