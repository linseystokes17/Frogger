// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Midterm.model = (function(components, graphics, assets) {
    'use strict';
    let that = {};
    let entities = {};  // key is 'id', value is an Entity
    let player = null;

    // ------------------------------------------------------------------
    // Define Objects (with components)
    // ------------------------------------------------------------------
    function createPlayerEntity(){
        let x = 1/15;
        let y = 1/15;

        player = Midterm.Entity.createEntity();
        let size = {
            width : 1/15,
            height : 1/15
        };
        
        player.addComponent(components.Appearance({
            spriteSheet: Midterm.assets.player,
            spriteCount: 1,
            spriteTime: [25],
            animationScale: 1,
            spriteSize: size,            // Maintain the size on the sprite
            sprite: 0,
            width: size.width,
            height: size.height,
        }));
        player.addComponent(components.Position({ x: x, y: y}));
        player.addComponent(components.Movable({     
            direction: Midterm.enums.Direction.Stopped, 
            facing: Midterm.enums.Direction.Stopped, 
            moveInterval: 100, }));
        player.addComponent(components.Collision());
        let inputSpecification = { keys: {
            'ArrowLeft': Midterm.enums.Direction.Left,
            'ArrowRight': Midterm.enums.Direction.Right,
            'ArrowUp': Midterm.enums.Direction.Up,
            'ArrowDown': Midterm.enums.Direction.Down,
            'Escape': Midterm.enums.Direction.Stopped
        }};
        player.addComponent(components.Keyboard(inputSpecification));
        
        return player;
    }
    
    // ------------------------------------------------------------------
    // Setup model & report events
    // ------------------------------------------------------------------
    function reportEvent(info) {
        switch (info.type) {
            case Midterm.enums.Event.ReachHome:
                console.log('Reach Home');
        }
    }

    that.initialize = function() {
        console.log('init model');

        console.log('initializing player starting position...');
        player = createPlayerEntity();
        entities[player.id] = player;

        console.log('player: ', player);
    };

    that.reset = function(){
        console.log('reset model');
    }

    // ------------------------------------------------------------------
    // This function is used to update the state of the demo model.
    // ------------------------------------------------------------------
    that.update = function(elapsedTime, totalTime) {
        Midterm.systems.keyboardInput.update(elapsedTime, entities);
        Midterm.systems.movement.update(elapsedTime, entities);
        Midterm.systems.collision.update(elapsedTime, totalTime, entities, reportEvent);
        Midterm.systems.render.update(elapsedTime, totalTime, entities);
    };

    return that;

}(Midterm.components, Midterm.graphics, Midterm.assets));
