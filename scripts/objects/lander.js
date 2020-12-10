// --------------------------------------------------------------
//
// Creates a Lander object, with functions for managing state.
//
// spec = {
//    imageSrc: 'assets/lander.png',
    // center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
    // size: { width: 30, height: 60 },
    // speed: {x: 0, y: 0},
    // angle: 0
// }
//
// --------------------------------------------------------------
LunarLander.objects.Lander = function(spec) {
    'use strict';

    let massEarth = 5.97*Math.pow(10, 18);
    let massShip = 200; //kg
    let gravConst = 6.67*Math.pow(10, -11);
    let radEarth = 6378000 //m
    let shipDistCenter =  radEarth + spec.center.y;
    let gravity = -gravConst*((massShip*massEarth)/Math.pow(shipDistCenter,2));
    let imageReady = false;
    let image = new Image();
    let location = {x: spec.center.x, y: spec.center.y};
    let radius = 8.5;
    
    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function rotateLeft(elapsedTime) {
        if(spec.fuel > 0){
            spec.angle -= Math.PI / 180;
            spec.fuel -= .01;
        }
    }

    function rotateRight(elapsedTime) {
        if(spec.fuel > 0){
            spec.angle += Math.PI/180;
            spec.fuel -= .01;
        }
    }

    function accelerate(elapsedTime){
        if(spec.fuel > 0){
            spec.thrust -= .002;
            spec.fuel -= .05;
            spec.velocity.x += spec.thrust * Math.sin(-spec.angle);
            spec.velocity.y += spec.thrust * Math.cos(spec.angle);
        }

    }

    function updatePosition(){
        //velocity.y += gravity;
        spec.center.x += spec.velocity.x;
        spec.center.y += spec.velocity.y;
        
        spec.velocity.y -= gravity;
        if (spec.thrust < gravity){
            spec.thrust -= gravity;
        }
    }

    function reset(){
        spec.angle = Math.PI/2;
        spec.center = { x: location.x, y: location.y };
        spec.velocity = {x: 0, y: 0};
        spec.fuel = 20;
    }

    function getCenter(){
        let center = {
            x: spec.center.x,
            y: spec.center.y,
            radius: radius,
        };
        return center
    }

    function lineCircleIntersection(pt1, pt2, circle){
        let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y }; 
        let v2 = { x: pt1.x - circle.x, y: pt1.y - circle.y }; 
        let b = -2 * (v1.x * v2.x + v1.y * v2.y); 
        let c = 2 * (v1.x * v1.x + v1.y * v1.y); 
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius)); 
        if (isNaN(d)) { // no intercept 
            return false; 
        } // These represent the unit distance of point one and two on the line 
        let u1 = (b - d) / c; let u2 = (b + d) / c; 
        if (u1 <= 1 && u1 >= 0) { // If point on the line segment 
            return true; 
        } 
        if (u2 <= 1 && u2 >= 0) { // If point on the line segment 
            return true; 
        } 
        return false; 
    }

    let api = {
        rotateLeft: rotateLeft,
        rotateRight: rotateRight,
        moveTo: moveTo,
        accelerate: accelerate,
        updatePosition:updatePosition,
        reset: reset,
        lineCircleIntersection: lineCircleIntersection,
        getCenter: getCenter,
        get imageReady() { return imageReady; },
        get angle() { return spec.angle; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get velocity() { return spec.velocity },
        get fuel() {return spec.fuel},
    };

    return api;
}
