// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Frogger.model = (function(components, graphics, assets, systems) {
    'use strict';
    let that = {};

    const GRID_SIZE = 15;
    const WORLD_SIZE =  graphics.core.getWorldSize();
    const BLOCK_SIZE = WORLD_SIZE / GRID_SIZE;
    const SECOND_INTERVAL = 20; // 1 = 1 second
    //const FROG_MOVE_INTERVAL = 150;

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
    let initPos = null;
    let numLives = 5;
    let numHomes = 0;
    
    let inputSpecification = { keys: systems.keyboardInput.getKeys()};

    let score = 0;
    let totalScore = 0;

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
            sprite: 3,
        }));
        home.addComponent(components.Position({ x: x, y: 1}));
        home.addComponent(components.Collision({alive: false}));
        home.addComponent(components.Home({changeInterval: x}));

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
        log.addComponent(components.Log());

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
        let chosen = Math.round(Math.random());
        let chose = false;
        if (chosen == 0){
            chose = false;
        }
        else if(chosen == 1){
            chose = true;
        }

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
        turtle.addComponent(components.Turtle({chosen: chose}));

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
        car.addComponent(components.Car());

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
        truck.addComponent(components.Car());

        return truck;
    }

    function createFrogEntity() {
        let x = (GRID_SIZE)/2;
        let y = GRID_SIZE-2;

        initPos = {
            x: x,
            y: y,
        };

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
            width: size.width,
            height: size.height,
        }));
        frog.addComponent(components.Position({ x: x, y: y}));
        frog.addComponent(components.Movable({     
            canMove : true,
            directionInterval : 0,
            directionElapsedInterval : 0,
            direction: Frogger.enums.Direction.Stopped, 
            facing: Frogger.enums.Direction.Stopped, 
            moveInterval: SECOND_INTERVAL/2,
            animationInterval: 500 }));
        frog.addComponent(components.Collision({alive: true, killed: false,riding: false}));
        frog.addComponent(components.Frog({totalTime: 0, numLives: 5}));
        frog.addComponent(components.Keyboard(inputSpecification));

        return frog;
    }

    // --------------------------------------------------------------
    // Interface that allows systems to report events back to the overall
    // game model for processing.
    // --------------------------------------------------------------
    function reportEvent(info) {
        switch (info.type) {
            case Frogger.enums.Event.ReachHome:
                
                if(info.hitEntity.components.appearance.sprite==1){ // gator
                    info.entity.components.collision.killed = true;
                }
                else if(info.hitEntity.components.appearance.sprite==0){ // bonus
                    totalScore -= 100;
                    info.hitEntity.components.appearance.sprite = 2;
                    info.entity.components.collision.home = true;
                    numHomes++;
                    totalScore += info.totalTime;
                }
                else{
                    info.hitEntity.components.appearance.sprite = 2;
                    info.entity.components.collision.home = true;
                    numHomes++;
                    totalScore += info.totalTime;
                }

                if(numHomes == 5){
                    Frogger.systems.Highscores.add(Math.round(totalScore/100));
                    Frogger.systems.keyboardInput.cancelNextRequest = true;
                } 
                break;

            case Frogger.enums.Event.HitSomething:
                info.entity.components.collision.killed = true;

                break;

            case Frogger.enums.Event.Ride:
                info.entity.components.collision.riding = true;
                info.entity.components.collision.objectRiding = info.hitEntity;
                info.entity.components.movable.direction = info.hitEntity.components.movable.facing;
                info.entity.components.movable.directionInterval = info.hitEntity.components.movable.moveInterval;
                info.entity.components.movable.directionElapsedInterval = info.hitEntity.components.movable.elapsedInterval;

                if (info.hitEntity.components.turtle && info.hitEntity.components.appearance.sprite==3){
                    info.entity.components.collision.killed = true;
                    info.entity.components.collision.riding = false;
                }
                else if(info.hitEntity.components.alligator){
                    let frogSquare = Math.round(info.entity.components.position.x);
                    let mouthPos = Math.round(info.hitEntity.components.position.x) + (info.hitEntity.components.appearance.width*15)/2;
                    if (info.hitEntity.components.appearance.sprite==1 && mouthPos == frogSquare){
                        info.entity.components.collision.killed = true;
                        info.entity.components.collision.riding = false;
                    }
                }

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
        for (var i=0; i<5; i++){
            let spriteWidth = 1+3;
            car = createCarEntity((spriteWidth*i), 12, Frogger.enums.Direction.Left, 0, SECOND_INTERVAL*1.2);
            entities[car.id] = car;
        }

        for (var i=0; i<4; i++){
            let spriteWidth = 2+8;
            truck = createTruckEntity((spriteWidth*i), 11, SECOND_INTERVAL*1.5);
            entities[truck.id] = truck;
        }

        for (var i=0; i<6; i++){
            let spriteWidth = 1+4;
            car = createCarEntity((spriteWidth*i), 10, Frogger.enums.Direction.Left, 1, SECOND_INTERVAL*.7);
            entities[car.id] = car;
        }

        for (var i=0; i<4; i++){
            let spriteWidth = 1+7;
            car = createCarEntity((spriteWidth*i), 9, Frogger.enums.Direction.Right, 2, SECOND_INTERVAL*.4);
            entities[car.id] = car;
        }

        for (var i=0; i<5; i++){
            let spriteWidth = 1+3;
            car = createCarEntity((spriteWidth*i)+2, 8, Frogger.enums.Direction.Left, 3, SECOND_INTERVAL);
            entities[car.id] = car;
        }

        // All river entities
        for(var i=0; i<5; i++){
            home = createHomeEntity((i*3)+1)
            entities[home.id] = home;
        }

        for(var i=0; i<6; i++){ // create 3 logs, 3 alligators
            let spriteWidth = 3+1;
            // if i%2!=0
            if(i%3 != 0){
                logM = createLogEntity((i*spriteWidth), 2, SECOND_INTERVAL*.7, Frogger.enums.Direction.Right, Frogger.assets.tree3, 3);
                entities[logM.id] = logM;
            }
            else{
                alligator = createAlligatorEntity((i*spriteWidth), 2, SECOND_INTERVAL*.7);
                entities[alligator.id] = alligator;
            }
        }

        for(var i=0; i<6; i++){
            let spriteWidth = 2+2;
            turtle2 = createTurtleEntity((i*spriteWidth), 3, SECOND_INTERVAL, Frogger.enums.Direction.Left, Frogger.assets.turtle2, 2);
            entities[turtle2.id] = turtle2;
        }

        for(var i=0; i<4; i++){
            let spriteWidth = 5+1;

            logL = createLogEntity((i*spriteWidth), 4, SECOND_INTERVAL*1.2, Frogger.enums.Direction.Right, Frogger.assets.tree2, 5);
            entities[logL.id] = logL;
        }

        for(var i=0; i<6; i++){
            let spriteWidth = 2+2;
            logS = createLogEntity((i*spriteWidth), 5, SECOND_INTERVAL*.5, Frogger.enums.Direction.Right, Frogger.assets.tree1, 2);
            entities[logS.id] = logS;
        }

        for(var i=0; i<5; i++){
            let spriteWidth = 3+2;
            turtle3 = createTurtleEntity((i*spriteWidth), 6, SECOND_INTERVAL*.7, Frogger.enums.Direction.Left, Frogger.assets.turtle3, 3);
            entities[turtle3.id] = turtle3;
        }

        console.log('initializing frog starting position...');
        frog = createFrogEntity();
        entities[frog.id] = frog;

        components.ParticleSystem.createEffectExplosion({
            center: { x: 0.5, y: 0.5 },
            howMany: 300
        });
    };

    that.reset = function(){
        Frogger.assets.music.pause();
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

        numLives = 5;
        numHomes = 0;

        score = 0;
        totalScore = 0;

        entities = {};
        Frogger.Entity.nextId = 1;
        Frogger.assets.music.play();

    }

    // ------------------------------------------------------------------
    //
    // This function is used to update the state of the demo model.
    //
    // ------------------------------------------------------------------
    that.update = function(elapsedTime, totalTime) {
        if(numLives == 0){
            Frogger.systems.keyboardInput.cancelNextRequest = true;
        }
        inputSpecification = { keys: systems.keyboardInput.getKeys()};
        systems.keyboardInput.update(elapsedTime, entities);
        systems.movement.update(elapsedTime, entities, GRID_SIZE);
        systems.collision.update(elapsedTime, totalTime, entities, reportEvent);
        systems.render.update(elapsedTime, totalScore, totalTime, entities, GRID_SIZE);
    };

    return that;

}(Frogger.components, Frogger.graphics, Frogger.assets, Frogger.systems));
