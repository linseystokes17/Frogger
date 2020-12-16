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
    const CARS_COUNT = 5;
    const SEMIS_COUNT = 5;
    const HOMES_COUNT = 5;
    const MOVE_INTERVAL = 150;
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
    function initializeCars() {
        let cars = {};

        function createCarEntity(x, y) {
            let car = Frogger.Entity.createEntity();
            car.addComponent(components.Appearance({ fill: {r: 255, g: 0, b: 0 }, stroke: 'rgb(0, 0, 0)' }));
            car.addComponent(components.Position({ x: x, y: y}));

            return car;
        }

        let remaining = CARS_COUNT;
        while (remaining >= 0) {
            let x = Random.nextRange(GRID_SIZE/2, GRID_SIZE - 3);
            let y = Random.nextRange(GRID_SIZE/2, GRID_SIZE - 3);
            let proposed = createCarEntity(x, y);
            if (!Frogger.systems.collision.collidesWithAny(proposed, cars)) {
                cars[proposed.id] = proposed;
                remaining--;
            }
        }

        return cars;
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
        let y = GRID_SIZE - 2;

        function createFrogEntity(x, y) {
            frog = Frogger.Entity.createEntity();
            frog.addComponent(components.Appearance({ fill: { r: 0, g: 100, b: 0 }, stroke: 'rgb(0, 0, 0)'}));
            frog.addComponent(components.Position({ x: x, y: y}));
            frog.addComponent(components.Movable({ facing: Frogger.enums.Direction.Stopped, moveInterval: MOVE_INTERVAL }));
            let inputSpecification = { keys: {
                'ArrowLeft': Frogger.enums.Direction.Left,
                'ArrowRight': Frogger.enums.Direction.Right,
                'ArrowUp': Frogger.enums.Direction.Up,
                'ArrowDown': Frogger.enums.Direction.Down
            }};
            frog.addComponent(components.KeyboardControlled(inputSpecification));
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

        console.log(entities);
        console.log('initializing homes...');
        let hs = initializeHomes();
        for (var h = 0; h< length.hs; h++){
            let home = hs[h]
            entites[home.id] = home;
        }

        console.log('initializing cars...');
        mergeObjects(entities, initializeCars());

        console.log('initialzing frog starting position...');
        let frog = initializeFrog();
        entities[frog.id] = frog;

    };

    // ------------------------------------------------------------------
    //
    // This function is used to update the state of the demo model.
    //
    // ------------------------------------------------------------------
    that.update = function(elapsedTime) {
        Frogger.systems.keyboardInput.update(elapsedTime, entities);
        Frogger.systems.movement.update(elapsedTime, entities);
        Frogger.systems.collision.update(elapsedTime, entities, reportEvent);
        Frogger.systems.render.update(elapsedTime, entities, GRID_SIZE);
    };

    return that;

}(Frogger.components, Frogger.graphics, Frogger.assets));
