// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Frogger.model = (function(components, graphics, assets) {
    'use strict';
    let that = {};

    const GRID_SIZE = 15;
    const WORLD_SIZE =  graphics.core.getWorldSize();
    const BLOCK_SIZE = WORLD_SIZE / GRID_SIZE;
    const SECOND_INTERVAL = 1; // 1 = 1 second
    const FROG_MOVE_INTERVAL = 500;
    let entities = {};  // key is 'id', value is an Entity
    let frog = null;

    // --------------------------------------------------------------
    // Defining each of the entity as entities that have position,
    // collision, and visual components.
    // --------------------------------------------------------------
    function createHomeEntity(x) {
        let home = Frogger.Entity.createEntity();
        home.addComponent(components.Appearance({numSprites: 4, index: 2, type: 'home', spritesheet: Frogger.assets.bonus}));
        home.addComponent(components.Position({ x: x, y: 1}));
        home.addComponent(components.Collision({alive: false}));

        return home;
    }

    function createLogEntity(x, y, interval, direction, asset) {
        let log = Frogger.Entity.createEntity();
        log.addComponent(components.Appearance({numSprites: 1, index: 0, type: 'log', spritesheet: asset}));
        log.addComponent(components.Position({ x: x, y: y, width: asset.width}));
        log.addComponent(components.Collision({alive: false}));
        log.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

        return log;
    }

    function createAlligatorEntity(x, y, interval) {
        let alligator = Frogger.Entity.createEntity();
        alligator.addComponent(components.Appearance({numSprites: 2, index: 0, type: 'alligator', spritesheet: Frogger.assets.alligator}));
        alligator.addComponent(components.Position({ x: x, y: y, width: Frogger.assets.alligator.width/2}));
        alligator.addComponent(components.Collision({alive: false}));
        alligator.addComponent(components.Movable({ facing: Frogger.enums.Direction.Right, moveInterval: interval }));

        return alligator;
    }

    function createCarEntity(x, y, direction, index, interval) {
        let car = Frogger.Entity.createEntity();
        car.addComponent(components.Appearance({numSprites: 4, index: index, type: 'car', spritesheet: Frogger.assets.car}));
        car.addComponent(components.Position({ x: x, y: y}));
        car.addComponent(components.Collision({alive: false}));
        car.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

        return car;
    }

    function createTruckEntity(x, y, interval) {
        let truck = Frogger.Entity.createEntity();
        truck.addComponent(components.Appearance({numSprites: 1, index: 0, type: 'truck', spritesheet: Frogger.assets.truck}));
        truck.addComponent(components.Position({ x: x, y: y}));
        truck.addComponent(components.Collision({alive: false}));
        truck.addComponent(components.Movable({ facing: Frogger.enums.Direction.Right, moveInterval: interval }));

        return truck;
    }

    // --------------------------------------------------------------
    //
    // Defining the frog as an entity that has position, direction,
    // collision, visual, and input components.
    //
    // --------------------------------------------------------------
    function initializeFrog() {
        frog = null;

        let x = (GRID_SIZE)/2;
        let y = GRID_SIZE-2;

        function createFrogEntity(x, y) {
            frog = Frogger.Entity.createEntity();
            let size = {
                width: 1/15,
                height: 1/15
            };
            
            frog.addComponent(components.Appearance({
                spriteSheet: Frogger.assets.frog,
                spriteCount: 11,
                spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
                animationScale: 1,
                spriteSize: size,            // Maintain the size on the sprite
                sprite: 0,
            }));
            frog.addComponent(components.Position({ x: x, y: y}));
            frog.addComponent(components.Movable({ facing: Frogger.enums.Direction.Stopped, moveInterval: FROG_MOVE_INTERVAL }));
            frog.addComponent(components.Collision({alive: true}));
            //frog.addComponent(components.Frog());

            let inputSpecification = { keys: {
                'ArrowLeft': Frogger.enums.Direction.Left,
                'ArrowRight': Frogger.enums.Direction.Right,
                'ArrowUp': Frogger.enums.Direction.Up,
                'ArrowDown': Frogger.enums.Direction.Down,
                'Escape': Frogger.enums.Direction.Stopped
            }};
            frog.addComponent(components.Keyboard(inputSpecification));

            return frog;
        }
        //
        // Create a proposed frog entity at this location and see if it collides with anything
        let proposed = createFrogEntity(x, y);
        if (!Frogger.systems.collision.collidesWithAny(proposed, entities)) {
            frog = proposed;
        }
        
        return frog;
    }

    // --------------------------------------------------------------
    //
    // Interface that allows systems to report events back to the overall
    // game model for processing.
    //
    // --------------------------------------------------------------
    function reportEvent(info) {
        switch (info.type) {
            case Frogger.enums.Event.ReachHome:
                break;
            case Frogger.enums.Event.HitSomething:
                break;
        }
    }

    // ------------------------------------------------------------------
    //
    // This function initializes the model.
    //
    // ------------------------------------------------------------------
    that.initialize = function() {
        console.log('initializing frog starting position...');
        frog = initializeFrog();
        entities[frog.id] = frog;
    };

    that.reset = function(){
        frog = null;
        entities = {};
        Frogger.Entity.nextId = 1;
    }

    // ------------------------------------------------------------------
    //
    // This function is used to update the state of the demo model.
    //
    // ------------------------------------------------------------------
    that.update = function(elapsedTime, totalTime) {
        Frogger.systems.keyboardInput.update(elapsedTime, entities);
        Frogger.systems.movement.update(elapsedTime,totalTime, entities, GRID_SIZE);
        Frogger.systems.collision.update(elapsedTime, entities, reportEvent);
        Frogger.systems.render.update(elapsedTime, entities, GRID_SIZE);
    };

    return that;

}(Frogger.components, Frogger.graphics, Frogger.assets));
