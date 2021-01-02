Frogger.screens['settings'] = (function(game, keyboard) {
    'use strict';
    let newKey = null;
    let keys = {};
    var back = document.getElementById('id-settings-back');
    var forward = document.getElementById('id-settings-forward');
    var backward = document.getElementById('id-settings-backward');
    var right = document.getElementById('id-settings-right');
    var left = document.getElementById('id-settings-left');
    
    function initialize() {
        keys = keyboard.getKeys();

        forward.textContent = 'ArrowUp';
        backward.textContent = 'ArrowDown';
        left.textContent = 'ArrowLeft';
        right.textContent = 'ArrowRight';

        back.addEventListener(
            'click',
            function() { 
                game.showScreen('main-menu'); 
                Frogger.assets.click.play();    
            });

        forward.addEventListener(
            'click',
            function() { 
                console.log('change forward setting', Frogger); 
                forward.addEventListener('keypress', function (e) {
                    newKey = e.key;
                    keyboard.setKey('ArrowUp', newKey);
                    forward.textContent = newKey;
                });
                Frogger.assets.click.play();    
            });
        
        backward.addEventListener(
            'click',
            function() { 
                console.log('change backward setting'); 
                backward.addEventListener('keypress', function (e) {
                    newKey = e.key;
                    keyboard.setKey('ArrowDown', newKey);
                    backward.textContent = newKey;
                });
                Frogger.assets.click.play();    
            });

        right.addEventListener(
            'click',
            function() { 
                console.log('change right setting'); 
                right.addEventListener('keypress', function (e) {
                    newKey = e.key;
                    keyboard.setKey('ArrowRight', newKey);
                    right.textContent = newKey;
                });
                Frogger.assets.click.play();    
            });

        left.addEventListener(
            'click',
            function() { 
                console.log('change left setting'); 
                left.addEventListener('keypress', function (e) {
                    newKey = e.key;
                    keyboard.setKey('ArrowLeft', newKey);
                    left.textContent = newKey;
                });
                Frogger.assets.click.play();    
            });
    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
        keys = keyboard.getKeys();
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(Frogger.game, Frogger.systems.keyboardInput));
