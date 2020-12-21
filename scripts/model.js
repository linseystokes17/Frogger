// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Frogger.model = (function(components, graphics, assets) {
    'use strict';
    let that = {};

    const GRID_SIZE = 14;
    const FIVE_COUNT = 5;
    const SECOND_INTERVAL = 1000; // 1 = 1 second
    const FROG_MOVE_INTERVAL = 50;
    const SPEED_INC = 75;
    let entities = {};  // key is 'id', value is an Entity

    // --------------------------------------------------------------
    // Defining the game home an entities that has position, collision,
    // and visual components.
    // --------------------------------------------------------------
    function createHomeEntity(x, y) {
        let home = Frogger.Entity.createEntity();
        home.addComponent(components.Appearance({numSprites: 4, index: 2, type: 'home', image: Frogger.assets.bonus, fill: {r: 255, g: 0, b: 0 }, stroke: 'rgb(0, 0, 0)' }));
        home.addComponent(components.Position({ x: x, y: y}));
        home.addComponent(components.Collision({alive: false}));

        return home;
    }

    // --------------------------------------------------------------
    // Defining each of the alligators as entities that have position,
    // collision, and visual components.
    // --------------------------------------------------------------
    function createAlligatorEntity(x, y) {
        let alligator = Frogger.Entity.createEntity();
        alligator.addComponent(components.Appearance({numSprites: 2, index: 0, type: 'alligator', image: Frogger.assets.alligator}));
        alligator.addComponent(components.Position({ x: x, y: y}));
        alligator.addComponent(components.Collision({alive: false}));
        alligator.addComponent(components.Movable({ facing: Frogger.enums.Direction.Right, moveInterval: interval }));

        return alligator;
    }

    function createLogEntity(x, y) {
        let log = Frogger.Entity.createEntity();
        log.addComponent(components.Appearance({numSprites: 1, index: index, type: 'log', image: asset, fill: {r: 255, g: 0, b: 0 }, stroke: 'rgb(0, 0, 0)' }));
        log.addComponent(components.Position({ x: x, y: y}));
        log.addComponent(components.Collision({alive: false}));
        log.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

        return log;
    }
    
    function initializeRiver(){
        // let alligator = null;
        // let log = null;
        // // First row of river - slowest
        // console.log('initialzing alligator1 starting position...');
        // let alligator = initializeAlligator(2, 5, Frogger.enums.Direction.Right, 0, SECOND_INTERVAL);
        // entities[alligator.id] = alligator;

        // let proposed = createLogEntity(x, y);
        // if (!Frogger.systems.collision.collidesWithAny(proposed, entities)) {
        //     log = proposed;
        // }
        // entities[log.id] = log;

        
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
            car.addComponent(components.Appearance({numSprites: 4, index: index, type: 'car', image: Frogger.assets.car, fill: {r: 255, g: 0, b: 0 }, stroke: 'rgb(0, 0, 0)' }));
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

    function initializeTruck(x, y, direction, index, interval) {
        let truck = null;

        function createTruckEntity(x, y) {
            let truck = Frogger.Entity.createEntity();
            truck.addComponent(components.Appearance({numSprites: 1, index: index, type: 'truck', image: Frogger.assets.truck, fill: {r: 255, g: 0, b: 0 }, stroke: 'rgb(0, 0, 0)' }));
            truck.addComponent(components.Position({ x: x, y: y}));
            truck.addComponent(components.Collision({alive: false}));
            truck.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

            return truck;
        }

        let proposed = createTruckEntity(x, y);
        if (!Frogger.systems.collision.collidesWithAny(proposed, entities)) {
            truck = proposed;
        }
        
        return truck;
    }

    function initializeRoad(){

        // First row of cars - slowest
        console.log('initialzing car1 starting position...');
        let car1 = initializeCar(9, GRID_SIZE-2, Frogger.enums.Direction.Right, 2, SECOND_INTERVAL);
        entities[car1.id] = car1;

        console.log('initialzing truck1 starting position...');
        let truck1 = initializeTruck(2, GRID_SIZE-2, Frogger.enums.Direction.Right, 0, SECOND_INTERVAL);
        entities[truck1.id] = truck1;

        // Second row of cars
        console.log('initialzing car3 starting position...');
        let car9 = initializeCar(GRID_SIZE-2, GRID_SIZE-3, Frogger.enums.Direction.Right, 2, SECOND_INTERVAL-SPEED_INC*4);
        entities[car9.id] = car9;

        console.log('initialzing truck2 starting position...');
        let truck2 = initializeTruck(5, GRID_SIZE-3, Frogger.enums.Direction.Right, 0, SECOND_INTERVAL-SPEED_INC*4);
        entities[truck2.id] = truck2;

         // Third row of cars
         console.log('initialzing car3 starting position...');
         let car7 = initializeCar(GRID_SIZE-2, GRID_SIZE-4, Frogger.enums.Direction.Left, 1, SECOND_INTERVAL-SPEED_INC*3);
         entities[car7.id] = car7;
 
         console.log('initialzing car4 starting position...');
         let car8 = initializeCar(4, GRID_SIZE-4, Frogger.enums.Direction.Left, 3, SECOND_INTERVAL-SPEED_INC*3);
         entities[car8.id] = car8;

        // Fourth row of cars
        console.log('initialzing car3 starting position...');
        let car3 = initializeCar(GRID_SIZE/2, GRID_SIZE-5, Frogger.enums.Direction.Left, 1, SECOND_INTERVAL-SPEED_INC*2);
        entities[car3.id] = car3;

        console.log('initialzing car4 starting position...');
        let car4 = initializeCar(GRID_SIZE-3, GRID_SIZE-5, Frogger.enums.Direction.Left, 0, SECOND_INTERVAL-SPEED_INC*2);
        entities[car4.id] = car4;

        // Fifth row of cars - fastest
        console.log('initialzing car5 starting position...');
        let car5 = initializeCar(2, GRID_SIZE-6, Frogger.enums.Direction.Left, 0, SECOND_INTERVAL-SPEED_INC*5);
        entities[car5.id] = car5;

        console.log('initialzing car6 starting position...');
        let car6 = initializeCar(GRID_SIZE-4, GRID_SIZE-6, Frogger.enums.Direction.Left, 3, SECOND_INTERVAL-SPEED_INC*5);
        entities[car6.id] = car6;
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
            frog.addComponent(components.Appearance({numSprites: 11,  index: 0, type: 'frog', image: Frogger.assets.frog, fill: 'rgb(0,200,0)', stroke: 'rgb(0, 0, 0)'}));
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
        // river between
            // y = [1, 6]

        initializeRoad();
        initializeRiver();

        console.log('initialzing frog starting position...');
        let frog = initializeFrog();
        entities[frog.id] = frog;

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
