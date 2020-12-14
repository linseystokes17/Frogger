// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
Frogger.model = (function(components, graphics, assets) {
    'use strict';
    let that = {};

    const GRID_SIZE = 50;
    const OBSTACLE_COUNT = 15;
    const MOVE_INTERVAL = 150;
    let entities = {};  // key is 'id', value is an Entity

    // --------------------------------------------------------------
    //
    // Defining the game border an entities that has position, collision,
    // and visual components.
    //
    // --------------------------------------------------------------
    function initializeBorder() {
        let border = Frogger.Entity.createEntity();
        border.addComponent(Frogger.components.Appearance({ fillStart: { r: 255, g: 0, b: 0 }, fillEnd: { r: 255, g: 0, b: 0 }, stroke: 'rgb(0, 0, 0)' }, ));
        border.addComponent(Frogger.components.Collision( { firstOnly: false }));
        let segments = [];

        for (let position = 0; position < GRID_SIZE; position++) {
            // Left border
            segments.push({ x: 0, y: position });
            // Right border
            segments.push({ x: GRID_SIZE - 1, y: position });
            // Top border
            segments.push({ x: position, y: 0 });
            // bottom border
            segments.push({ x: position, y: GRID_SIZE - 1 });
        }

        border.addComponent(Frogger.components.Position({segments: segments }));

        return border;
    }

    // --------------------------------------------------------------
    //
    // Defining each of the obstacles as entities that have position,
    // collision, and visual components.
    //
    // --------------------------------------------------------------
    function initializeObstacles() {
        let obstacles = {};

        function createObstacleEntity(x, y) {
            let obstacle = Frogger.Entity.createEntity();
            obstacle.addComponent(Frogger.components.Appearance({ fillStart: {r: 0, g: 255, b: 0 }, fillEnd: {r: 0, g: 255, b: 0 }, stroke: 'rgb(0, 0, 0)' }));
            obstacle.addComponent(Frogger.components.Position({ segments: [{ x: x, y: y }] }));
            obstacle.addComponent(Frogger.components.Collision());

            return obstacle;
        }

        let remaining = OBSTACLE_COUNT;
        while (remaining > 0) {
            let x = Random.nextRange(1, GRID_SIZE - 2);
            let y = Random.nextRange(1, GRID_SIZE - 2);
            let proposed = createObstacleEntity(x, y);
            if (!Frogger.systems.collision.collidesWithAny(proposed, obstacles)) {
                obstacles[proposed.id] = proposed;
                remaining--;
            }
        }

        return obstacles;
    }

    // --------------------------------------------------------------
    //
    // Defining the snake as an entity that has position, direction,
    // collision, visual, and input components.
    //
    // --------------------------------------------------------------
    function initializeSnake() {
        let snake = null;

        function createSnakeEntity(x, y) {
            let snake = Frogger.Entity.createEntity();
            snake.addComponent(Frogger.components.Appearance({ fillStart: { r: 255, g: 255, b: 255 }, fillEnd: {r: 0, g: 0, b: 255 }, stroke: 'rgb(0, 0, 0)' }));
            snake.addComponent(Frogger.components.Position({ segments: [{ x: x, y: y }] }));
            snake.addComponent(Frogger.components.Collision());
            snake.addComponent(Frogger.components.Movable({ facing: Frogger.enums.Direction.Stopped, moveInterval: MOVE_INTERVAL }));
            let inputSpecification = { keys: {
                'ArrowLeft': Frogger.enums.Direction.Left,
                'ArrowRight': Frogger.enums.Direction.Right,
                'ArrowUp': Frogger.enums.Direction.Up,
                'ArrowDown': Frogger.enums.Direction.Down
            }};
            snake.addComponent(Frogger.components.KeyboardControlled(inputSpecification));

            return snake;
        }

        let done = false;
        while (!done) {
            let x = Random.nextRange(1, GRID_SIZE - 2);
            let y = Random.nextRange(1, GRID_SIZE - 2);
            //
            // Create a proposed snake entity at this location and see if it collides with anything
            let proposed = createSnakeEntity(x, y);
            if (!Frogger.systems.collision.collidesWithAny(proposed, entities)) {
                snake = proposed;
                done = true;
            }
        }

        return snake;
    }

    // --------------------------------------------------------------
    //
    // Defining the food as an entity that has position, collision, 
    // and visual components.
    //
    // --------------------------------------------------------------
    function createFood() {
        let food = null;

        function createFoodEntity(x, y) {
            let food = Frogger.Entity.createEntity();
            food.addComponent(Frogger.components.Appearance({ fillStart: {r: 255, g: 128, b: 0 }, fillEnd: {r: 255, g: 128, b: 0 }, stroke: 'rgb(0, 0, 0)' }));
            food.addComponent(Frogger.components.Position({ segments: [{ x: x, y: y }] }));
            food.addComponent(Frogger.components.Collision());
            food.addComponent(Frogger.components.Food());

            return food;
        }

        let done = false;
        while (!done) {
            let x = Random.nextRange(1, GRID_SIZE - 2);
            let y = Random.nextRange(1, GRID_SIZE - 2);
            //
            // Create a proposed food entity at this location and see if it collides with anything
            let proposed = createFoodEntity(x, y);
            if (!Frogger.systems.collision.collidesWithAny(proposed, entities)) {
                food = proposed;
                done = true;
            }
        }

        return food;
    }

    // --------------------------------------------------------------
    //
    // Interface that allows systems to report events back to the overall
    // game model for processing.
    //
    // --------------------------------------------------------------
    function reportEvent(info) {
        switch (info.type) {
            case Frogger.enums.Event.ConsumeFood:
                delete entities[info.entity.id];
                let food = createFood();
                entities[food.id] = food;
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
        console.log('initializing borders...');
        let border = initializeBorder();
        entities[border.id] = border;

        console.log('initializing obstacles...');
        mergeObjects(entities, initializeObstacles());

        console.log('initialzing snake starting position...');
        let snake = initializeSnake();
        entities[snake.id] = snake;

        console.log('initialzing first food location...');
        let food = createFood();
        entities[food.id] = food;
    };

    // ------------------------------------------------------------------
    //
    // This function is used to update the state of the demo model.
    //
    // ------------------------------------------------------------------
    that.update = function(elapsedTime) {
        Frogger.systems.keyboardInput.update;
        Frogger.systems.movement.update(elapsedTime, entities);
        Frogger.systems.collision.update(elapsedTime, entities, reportEvent);
        Frogger.systems.render.update(elapsedTime, entities, GRID_SIZE);
    };

    return that;

}(Frogger.components, Frogger.graphics, Frogger.assets));
