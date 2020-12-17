// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Frogger.model = (function(components, graphics, assets) {
    'use strict';
    let that = {};

    const GRID_SIZE = 14;
    const LOGS_COUNT = 5;
    const ALLIGATORS_COUNT = 5;
    const HOMES_COUNT = 5;
    const SECOND_INTERVAL = 1; // 1 = 1 second
    const FROG_MOVE_INTERVAL = .5;
    const CAR_MOVE_INTERVAL = SECOND_INTERVAL;
    const SPEED_INC = .05;
    let entities = {};  // key is 'id', value is an Entity

    // --------------------------------------------------------------
    //
    // Defining the game home an entities that has position, collision,
    // and visual components.
    //
    // --------------------------------------------------------------
    function initializeHomes() {
        let homes = {};

        function createHomeEntity(x, y) {
            let home = Frogger.Entity.createEntity();
            home.addComponent(components.Appearance({ fill: {r: 0, g: 200, b: 0 } }));
            home.addComponent(components.Position({ x: x, y: y}));
            home.addComponent(components.Collision({alive: false}));

            return home;
        }

        let remaining = HOMES_COUNT;
        while (remaining >= 0) {
            let x = 1;
            let y = 0;
            let proposed = createHomeEntity(x, y);
            if (!Frogger.systems.collision.collidesWithAny(proposed, homes)) {
                homes[proposed.id] = proposed;
                remaining--;
            }
            x+=2;
        }

        return homes;
    }

    // --------------------------------------------------------------
    //
    // Defining each of the cars as entities that have position,
    // collision, and visual components.
    //
    // --------------------------------------------------------------
    function initializeCar(x, y, direction, index, interval) {
        let car = null;

        function createCarEntity(x, y) {
            let car = Frogger.Entity.createEntity();
            car.addComponent(components.Appearance({ index: index, type: 'car', image: Frogger.assets.car1, fill: {r: 255, g: 0, b: 0 }, stroke: 'rgb(0, 0, 0)' }));
            car.addComponent(components.Position({ x: x, y: y}));
            car.addComponent(components.Collision({alive: false}));
            car.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

            return car;
        }

        let proposed = createCarEntity(x, y);
        if (!Frogger.systems.collision.collidesWithAny(proposed, entities)) {
            car = proposed;
        }
        
        return car;
    }

    // --------------------------------------------------------------
    //
    // Defining the frog as an entity that has position, direction,
    // collision, visual, and input components.
    //
    // --------------------------------------------------------------
    function initializeFrog() {
        let frog = null;

        let x = (GRID_SIZE)/2;
        let y = GRID_SIZE - 1;

        function createFrogEntity(x, y) {
            frog = Frogger.Entity.createEntity();
            frog.addComponent(components.Appearance({ type: 'frog', image: Frogger.assets.frog, fill: 'rgb(0,200,0)', stroke: 'rgb(0, 0, 0)'}));
            frog.addComponent(components.Position({ x: x, y: y}));
            frog.addComponent(components.Movable({ facing: Frogger.enums.Direction.Stopped, moveInterval: FROG_MOVE_INTERVAL }));
            frog.addComponent(components.Collision({alive: true}));
            frog.addComponent(components.AnimatedModel({spritesheet: Frogger.assets.frog, spriteCount: 11, spriteTime: 1}))
            let inputSpecification = { keys: {
                'ArrowLeft': Frogger.enums.Direction.Left,
                'ArrowRight': Frogger.enums.Direction.Right,
                'ArrowUp': Frogger.enums.Direction.Up,
                'ArrowDown': Frogger.enums.Direction.Down
            }};
            frog.addComponent(components.Keyboard(inputSpecification));
            // TODO Here
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

    // --------------------------------------------------------------
    //
    // Helper method used to merge the properites of the 'source' object
    // into the 'dest' object.
    //
    // --------------------------------------------------------------
    function mergeObjects(dest, source) {
        for (let key in source) {
            dest[key] = source[key];
        }
    }

    // ------------------------------------------------------------------
    //
    // This function initializes the model.
    //
    // ------------------------------------------------------------------
    that.initialize = function() {

        // cars should start between 
            // x = [-1, GRID_SIZE-2]
            // y = [GRID_SIZE-6, GRID_SIZE-2]

        console.log('initialzing frog starting position...');
        let frog = initializeFrog();
        entities[frog.id] = frog;

        // First row of cars - slowest
        console.log('initialzing car1 starting position...');
        let car1 = initializeCar(2, GRID_SIZE-2, Frogger.enums.Direction.Right, 2, CAR_MOVE_INTERVAL);
        entities[car1.id] = car1;

        console.log('initialzing car2 starting position...');
        let car2 = initializeCar(9, GRID_SIZE-2, Frogger.enums.Direction.Right, 2, CAR_MOVE_INTERVAL);
        entities[car2.id] = car2;

        // Second row of cars
        console.log('initialzing car3 starting position...');
        let car9 = initializeCar(GRID_SIZE-2, GRID_SIZE-3, Frogger.enums.Direction.Right, 2, CAR_MOVE_INTERVAL-SPEED_INC*4);
        entities[car9.id] = car9;

        console.log('initialzing car4 starting position...');
        let car10 = initializeCar(5, GRID_SIZE-3, Frogger.enums.Direction.Right, 2, CAR_MOVE_INTERVAL-SPEED_INC*4);
        entities[car10.id] = car10;

         // Third row of cars
         console.log('initialzing car3 starting position...');
         let car7 = initializeCar(GRID_SIZE-2, GRID_SIZE-4, Frogger.enums.Direction.Left, 1, CAR_MOVE_INTERVAL-SPEED_INC*3);
         entities[car7.id] = car7;
 
         console.log('initialzing car4 starting position...');
         let car8 = initializeCar(4, GRID_SIZE-4, Frogger.enums.Direction.Left, 3, CAR_MOVE_INTERVAL-SPEED_INC*3);
         entities[car8.id] = car8;

        // Fourth row of cars
        console.log('initialzing car3 starting position...');
        let car3 = initializeCar(GRID_SIZE/2, GRID_SIZE-5, Frogger.enums.Direction.Left, 1, CAR_MOVE_INTERVAL-SPEED_INC*2);
        entities[car3.id] = car3;

        console.log('initialzing car4 starting position...');
        let car4 = initializeCar(GRID_SIZE-3, GRID_SIZE-5, Frogger.enums.Direction.Left, 0, CAR_MOVE_INTERVAL-SPEED_INC*2);
        entities[car4.id] = car4;

        // Fifth row of cars - fastest
        console.log('initialzing car5 starting position...');
        let car5 = initializeCar(2, GRID_SIZE-6, Frogger.enums.Direction.Left, 0, CAR_MOVE_INTERVAL-SPEED_INC*5);
        entities[car5.id] = car5;

        console.log('initialzing car6 starting position...');
        let car6 = initializeCar(GRID_SIZE-4, GRID_SIZE-6, Frogger.enums.Direction.Left, 3, CAR_MOVE_INTERVAL-SPEED_INC*5);
        entities[car6.id] = car6;

    };

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
