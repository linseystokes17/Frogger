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
    const SECOND_INTERVAL = 20; // 1 = 1 second
    const FROG_MOVE_INTERVAL = 300;
    let entities = {};  // key is 'id', value is an Entity
    let frog = null;
    let car = null;
    let truck = null;
    let home = null;
    let logS = null;
    let logM = null;
    let logL = null;
    let alligator = null;
    let turtle2 = null;
    let turtle3 = null;

    // --------------------------------------------------------------
    // Defining each of the entity as entities that have position,
    // collision, and visual components.
    // --------------------------------------------------------------
    function createHomeEntity(x) {
        let home = Frogger.Entity.createEntity();
        let size = {
            width: 1/15,
            height: 1/15
        };
        home.addComponent(components.Appearance({
            spriteSheet: Frogger.assets.bonus,
            spriteCount: 4,
            spriteTime: [25, 25, 25, 25],
            animationScale: 1,
            spriteSize: size,            // Maintain the size on the sprite
            sprite: 2,
        }));

        home.addComponent(components.Position({ x: x, y: 1}));
        home.addComponent(components.Collision({alive: false}));

        return home;
    }

    function createLogEntity(x, y, interval, direction, asset, width) {
        let log = Frogger.Entity.createEntity();

        let size = {
            width: width/15,
            height: 1/15
        };
        log.addComponent(components.Appearance({
            spriteSheet: asset,
            spriteCount: 1,
            spriteTime: [25],
            animationScale: 1,
            spriteSize: size,            // Maintain the size on the sprite
            sprite: 0,
        }));

        log.addComponent(components.Position({ x: x, y: y, width: asset.width}));
        log.addComponent(components.Collision({alive: false}));
        log.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

        return log;
    }

    function createAlligatorEntity(x, y, interval) {
        let alligator = Frogger.Entity.createEntity();

        let size = {
            width: 3/15,
            height: 1/15
        };
        alligator.addComponent(components.Appearance({
            spriteSheet: Frogger.assets.alligator,
            spriteCount: 2,
            spriteTime: [25, 25],
            animationScale: 1,
            spriteSize: size,            // Maintain the size on the sprite
            sprite: 0,
        }));

        alligator.addComponent(components.Position({ x: x, y: y}));
        alligator.addComponent(components.Collision({alive: false}));
        alligator.addComponent(components.Movable({ facing: Frogger.enums.Direction.Right, moveInterval: interval }));
        alligator.addComponent(components.Alligator());

        return alligator;
    }

    function createTurtleEntity(x, y, interval, direction, asset, width) {
        let turtle = Frogger.Entity.createEntity();

        let size = {
            width: width/15,
            height: 1/15
        };
        turtle.addComponent(components.Appearance({
            spriteSheet: asset,
            spriteCount: 4,
            spriteTime: [25, 25, 25, 25],
            animationScale: 1,
            spriteSize: size,            // Maintain the size on the sprite
            sprite: 0,
        }));

        turtle.addComponent(components.Position({ x: x, y: y}));
        turtle.addComponent(components.Collision({alive: false}));
        turtle.addComponent(components.Movable({ facing: direction, moveInterval: interval }));
        turtle.addComponent(components.Turtle());

        return turtle;
    }

    function createCarEntity(x, y, direction, index, interval) {
        let car = Frogger.Entity.createEntity();
        let size = {
            width: 1/15,
            height: 1/15
        };
        car.addComponent(components.Appearance({
            spriteSheet: Frogger.assets.car,
            spriteCount: 4,
            spriteTime: [25, 25, 25, 25],
            animationScale: 1,
            spriteSize: size,            // Maintain the size on the sprite
            sprite: index,
        }));
        car.addComponent(components.Position({ x: x, y: y}));
        car.addComponent(components.Collision({alive: false}));
        car.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

        return car;
    }

    function createTruckEntity(x, y, interval) {
        let truck = Frogger.Entity.createEntity();
        let size = {
            width: 2/15,
            height: 1/15
        };
        truck.addComponent(components.Appearance({
            spriteSheet: Frogger.assets.truck,
            spriteCount: 1,
            spriteTime: [25],
            animationScale: 1,
            spriteSize: size,            // Maintain the size on the sprite
            sprite: 0,
        }));
        truck.addComponent(components.Position({ x: x, y: y}));
        truck.addComponent(components.Collision({alive: false}));
        truck.addComponent(components.Movable({ facing: Frogger.enums.Direction.Right, moveInterval: interval }));

        return truck;
    }

    // --------------------------------------------------------------
    // Defining the frog as an entity that has position, direction,
    // collision, visual, and input components.
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
            frog.addComponent(components.Frog());

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
        
        // Create a proposed frog entity at this location and see if it collides with anything
        let proposed = createFrogEntity(x, y);
        if (!Frogger.systems.collision.collidesWithAny(proposed, entities)) {
            frog = proposed;
        }
        
        return frog;
    }

    // --------------------------------------------------------------
    // Interface that allows systems to report events back to the overall
    // game model for processing.
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
        // All road entities
        for (var i=0; i<3; i++){
            car = createCarEntity((6*i)+1, 12, Frogger.enums.Direction.Left, 0, SECOND_INTERVAL*1.2);
            entities[car.id] = car;
        }

        for (var i=0; i<2; i++){
            truck = createTruckEntity((8*i)+2*i, 11, SECOND_INTERVAL*1.5);
            entities[truck.id] = truck;
        }

        for (var i=0; i<4; i++){
            car = createCarEntity((4*i)+4, 10, Frogger.enums.Direction.Left, 1, SECOND_INTERVAL*.7);
            entities[car.id] = car;
        }

        for (var i=0; i<2; i++){
            car = createCarEntity((13*i), 9, Frogger.enums.Direction.Right, 2, SECOND_INTERVAL*.4);
            entities[car.id] = car;
        }

        for (var i=0; i<3; i++){
            car = createCarEntity((5*i)+5, 8, Frogger.enums.Direction.Left, 3, SECOND_INTERVAL);
            entities[car.id] = car;
        }

        // All river entities
        for(var i=0; i<5; i++){
            home = createHomeEntity((i*3)+1)
            entities[home.id] = home;
        }

        for(var i=0; i<3; i++){
            logM = createLogEntity((i*5)+4, 2, SECOND_INTERVAL*.7, Frogger.enums.Direction.Right, Frogger.assets.tree3, 3);
            entities[logM.id] = logM;
        }

        alligator = createAlligatorEntity(0, 2, SECOND_INTERVAL*.7);
        entities[alligator.id] = alligator;

        for(var i=0; i<5; i++){
            turtle2 = createTurtleEntity((i*4), 3, SECOND_INTERVAL, Frogger.enums.Direction.Left, Frogger.assets.turtle2, 2);
            entities[turtle2.id] = turtle2;
        }

        for(var i=0; i<2; i++){
            logL = createLogEntity((i*9)+1, 4, SECOND_INTERVAL*1.2, Frogger.enums.Direction.Right, Frogger.assets.tree2, 5);
            entities[logL.id] = logL;
        }

        for(var i=0; i<3; i++){
            logS = createLogEntity((i*6)+1, 5, SECOND_INTERVAL*.5, Frogger.enums.Direction.Right, Frogger.assets.tree1, 2);
            entities[logS.id] = logS;
        }

        for(var i=0; i<3; i++){
            turtle3 = createTurtleEntity((i*6)+2, 6, SECOND_INTERVAL*.7, Frogger.enums.Direction.Left, Frogger.assets.turtle3, 3);
            entities[turtle3.id] = turtle3;
        }

        console.log('initializing frog starting position...');
        frog = initializeFrog();
        entities[frog.id] = frog;

    };

    that.reset = function(){
        frog = null;
        car = null;
        truck = null;

        home = null;
        logS = null;
        logM = null;
        logL = null;
        alligator = null;
        turtle2 = null;
        turtle3 = null;

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
