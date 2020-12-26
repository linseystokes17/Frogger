// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Frogger.model = (function(components, graphics, assets) {
    'use strict';
    let that = {};
    let frog = null;

    const GRID_SIZE = 15;
    const FIVE_COUNT = 5;
    const WORLD_SIZE =  graphics.core.getWorldSize();
    const BLOCK_SIZE = WORLD_SIZE / GRID_SIZE;
    const SECOND_INTERVAL = 1; // 1 = 1 second
    const FROG_MOVE_INTERVAL = 500;
    const SPEED_INC = .1;
    let entities = {};  // key is 'id', value is an Entity

    // --------------------------------------------------------------
    // Defining the game home an entities that has position, collision,
    // and visual components.
    // --------------------------------------------------------------
    function createHomeEntity(x) {
        let home = Frogger.Entity.createEntity();
        home.addComponent(components.Appearance({numSprites: 4, index: 2, type: 'home', image: Frogger.assets.bonus}));
        home.addComponent(components.Position({ x: x, y: 1}));
        home.addComponent(components.Collision({alive: false}));

        return home;
    }

    // --------------------------------------------------------------
    // Defining each of the alligators as entities that have position,
    // collision, and visual components.
    // --------------------------------------------------------------
    function createAlligatorEntity(x, y, interval) {
        let alligator = Frogger.Entity.createEntity();
        alligator.addComponent(components.Appearance({numSprites: 2, index: 0, type: 'alligator', image: Frogger.assets.alligator}));
        alligator.addComponent(components.Position({ x: x, y: y, width: Frogger.assets.alligator.width/2}));
        alligator.addComponent(components.Collision({alive: false}));
        alligator.addComponent(components.Movable({ facing: Frogger.enums.Direction.Right, moveInterval: interval }));

        return alligator;
    }

    function createLogEntity(x, y, interval, direction, asset) {
        let log = Frogger.Entity.createEntity();
        log.addComponent(components.Appearance({numSprites: 1, index: 0, type: 'log', image: asset}));
        log.addComponent(components.Position({ x: x, y: y, width: asset.width}));
        log.addComponent(components.Collision({alive: false}));
        log.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

        return log;
    }
    
    function initializeRiver(){

        const WORLD_SIZE =  graphics.core.getWorldSize();
        const BLOCK_SIZE = WORLD_SIZE / GRID_SIZE;
        let rightLanes = [4, 5, 6];
        let leftLanes = [2, 3];
        let trees = [Frogger.assets.tree1, Frogger.assets.tree2, Frogger.assets.tree3];

        let gator = null;
        let gator2 = null;
        let gator3 = null;

        let log = null;
        let log2 = null;

        var randTree = trees[Math.floor(Math.random() * trees.length)];
        let rowInterval = SECOND_INTERVAL;

        for (var i=0; i<rightLanes.length; i++){
            rowInterval = rowInterval*(rightLanes[i]);

            randTree = trees[Math.floor(Math.random() * trees.length)];
            log2 = createLogEntity(0, rightLanes[i], rowInterval, Frogger.enums.Direction.Right, randTree);
            entities[log2.id] = log2;

            gator2 = createAlligatorEntity((log2.components.position.width/BLOCK_SIZE)+2, rightLanes[i], rowInterval);
            entities[gator2.id] = gator2;

            randTree = trees[Math.floor(Math.random() * trees.length)];
            log = createLogEntity(((log2.components.position.width+gator2.components.position.width)/BLOCK_SIZE)+2, rightLanes[i], rowInterval, Frogger.enums.Direction.Right, randTree);
            entities[log.id] = log;

            gator = createAlligatorEntity(((log2.components.position.width+gator2.components.position.width+log.components.position.width)/BLOCK_SIZE)+2, rightLanes[i], rowInterval);
            entities[gator.id] = gator;
        }
    }

    // --------------------------------------------------------------
    //
    // Defining each of the cars as entities that have position,
    // collision, and visual components.
    //
    // --------------------------------------------------------------
    function createCarEntity(x, y, direction, index, interval) {
        let car = Frogger.Entity.createEntity();
        car.addComponent(components.Appearance({numSprites: 4, index: index, type: 'car', image: Frogger.assets.car}));
        car.addComponent(components.Position({ x: x, y: y}));
        car.addComponent(components.Collision({alive: false}));
        car.addComponent(components.Movable({ facing: direction, moveInterval: interval }));

        return car;
    }

    function createTruckEntity(x, y, interval) {
        let truck = Frogger.Entity.createEntity();
        truck.addComponent(components.Appearance({numSprites: 1, index: 0, type: 'truck', image: Frogger.assets.truck}));
        truck.addComponent(components.Position({ x: x, y: y}));
        truck.addComponent(components.Collision({alive: false}));
        truck.addComponent(components.Movable({ facing: Frogger.enums.Direction.Right, moveInterval: interval }));

        return truck;
    }

    function initializeRoad(){
        let rightLanes = [GRID_SIZE-3, GRID_SIZE-4];
        let leftLanes = [GRID_SIZE-5, GRID_SIZE-6, GRID_SIZE-7];
        let leftIndexes = [0,1,3];

        let car = null;
        let car2 = null;
        let car3 = null;
        let car4 = null;
        let car5 = null;
        let truck = null;
        let truck2 = null;

        for (var i=0; i<rightLanes.length; i++){
            let proposedCar = createCarEntity(0, rightLanes[i], Frogger.enums.Direction.Right, 2, (SPEED_INC * i) * SECOND_INTERVAL);
            if (!Frogger.systems.collision.collidesWithAny(proposedCar, entities)) {
                car = proposedCar;
                entities[car.id] = car;
            }

            let proposedTruck = createTruckEntity(4, rightLanes[i], (SPEED_INC * i) * SECOND_INTERVAL);
            if (!Frogger.systems.collision.collidesWithAny(proposedTruck, entities)) {
                truck = proposedTruck;
                entities[truck.id] = truck;
            }

            let proposedCar2 = createCarEntity(8, rightLanes[i], Frogger.enums.Direction.Right, 2, (SPEED_INC * i) * SECOND_INTERVAL);
            if (!Frogger.systems.collision.collidesWithAny(proposedCar2, entities)) {
                car2 = proposedCar2;
                entities[car2.id] = car2;
            }

            let proposedTruck2 = createTruckEntity(12, rightLanes[i], (SPEED_INC * i) * SECOND_INTERVAL);
            if (!Frogger.systems.collision.collidesWithAny(proposedTruck2, entities)) {
                truck2 = proposedTruck2;
                entities[truck2.id] = truck2;
            }

            let proposedCar3 = createCarEntity(16, rightLanes[i], Frogger.enums.Direction.Right, 2, (SPEED_INC * i) * SECOND_INTERVAL);
            if (!Frogger.systems.collision.collidesWithAny(proposedCar3, entities)) {
                car3 = proposedCar3;
                entities[car3.id] = car3;
            }
        }

        for (var i=0; i<=leftLanes.length; i++){
            car = createCarEntity(0, leftLanes[i], Frogger.enums.Direction.Left, leftIndexes[i], SPEED_INC*(i-1) * SECOND_INTERVAL);
            entities[car.id] = car;

            car2 = createCarEntity(4, leftLanes[i], Frogger.enums.Direction.Left, leftIndexes[i], SPEED_INC*(i-1) * SECOND_INTERVAL);
            entities[car2.id] = car2;

            car3 = createCarEntity(8, leftLanes[i], Frogger.enums.Direction.Left, leftIndexes[i], SPEED_INC*(i-1) *SECOND_INTERVAL);
            entities[car3.id] = car3;

            car4 = createCarEntity(12, leftLanes[i], Frogger.enums.Direction.Left, leftIndexes[i], SPEED_INC*(i-1) * SECOND_INTERVAL);
            entities[car4.id] = car4; 

            car5 = createCarEntity(16, leftLanes[i], Frogger.enums.Direction.Left, leftIndexes[i], SPEED_INC*(i-1)* SECOND_INTERVAL);
            entities[car5.id] = car5;
        }

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
        let y = GRID_SIZE-2;

        function createFrogEntity(x, y) {
            frog = Frogger.Entity.createEntity();
            frog.addComponent(components.Appearance({numSprites: 11,  index: 0, type: 'frog', image: Frogger.assets.frog, fill: 'rgb(0,200,0)', stroke: 'rgb(0, 0, 0)'}));
            frog.addComponent(components.Position({ x: x, y: y, width: Frogger.assets.frog.width, height: Frogger.assets.frog.height}));
            frog.addComponent(components.Movable({ facing: Frogger.enums.Direction.Stopped, moveInterval: FROG_MOVE_INTERVAL }));
            frog.addComponent(components.Collision({alive: true}));
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
