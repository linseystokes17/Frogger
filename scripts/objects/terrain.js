LunarLander.objects.Terrain = function(spec) {
    'use strict';
    let smallestSplit = 6;
    let rough = .4;
    
    let w15 = spec.canv.width*.15;
    let startX1 = randomIntFromInterval(w15, spec.canv.width/2);
    let endX1 = startX1 + 100;
    let Y1 = randomIntFromInterval(spec.canv.height/2, spec.canv.height);    
    let startX2 = randomIntFromInterval(spec.canv.width/2, spec.canv.width-w15-100);
    let endX2 = startX2 + 100;
    let Y2 = randomIntFromInterval(spec.canv.height/2, spec.canv.height);
    let p0 = {x:0 , y: randomIntFromInterval(spec.canv.height/2, spec.canv.height)};
    let p1 = {x:startX1, y: Y1};
    let p2 = {x:endX1, y: Y1};
    let p3 = {x:startX2, y: Y2};
    let p4 = {x:endX2, y: Y2};
    let p5 = {x:spec.canv.width, y: randomIntFromInterval(spec.canv.height/2, spec.canv.height)};

    function reset(){
        spec.points = [];
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    function generateTerrain(numPlatforms, platformWidth){
        startX1 = randomIntFromInterval(w15, spec.canv.width/2);
        endX1 = startX1 + platformWidth;
        Y1 = randomIntFromInterval(spec.canv.height/2, spec.canv.height);
        if (numPlatforms == 2){
            startX2 = randomIntFromInterval(spec.canv.width/2, spec.canv.width-w15-platformWidth);
            endX2 = startX2 + platformWidth;
            Y2 = randomIntFromInterval(spec.canv.height/2, spec.canv.height);
            p3 = {x:startX2, y: Y2};
            p4 = {x:endX2, y: Y2};
            spec.points.push(p3,p4);
        }


        p0 = {x:0 , y: randomIntFromInterval(spec.canv.height/2, spec.canv.height)};
        p1 = {x:startX1, y: Y1};
        p2 = {x:endX1, y: Y1};
        p5 = {x:spec.canv.width, y: randomIntFromInterval(spec.canv.height/2, spec.canv.height)};

        spec.points.push(p0,p1,p2,p5);

        if (numPlatforms == 1){
            randomMidDisplace(p0, p1);
            randomMidDisplace(p2, p5);
        }
        else if (numPlatforms == 2){
            randomMidDisplace(p0, p1);
            randomMidDisplace(p2, p3);
            randomMidDisplace(p4, p5);
        }

        spec.points.sort((a,b)=>{
            return a.x - b.x;
        });        
    }

    function randomMidDisplace(pt1, pt2){
        //console.log(Math.abs(p2.x - p1.x));
        var p = {x: 0, y:0};
        var r = rough*Math.random()*Math.abs(pt2.x - pt1.x);
        p.x = pt2.x - (Math.abs(pt2.x - pt1.x) / 2);
        p.y = .5*(pt1.y+pt2.y) + r;
        while (p.y > spec.canv.height){
            r = rough*Math.random()*Math.abs(pt2.x - pt1.x)
            p.y = .5*(pt1.y+pt2.y) + r
        }
        
        if (Math.abs(p.x-pt1.x)<=smallestSplit/2 || Math.round(p.x)==Math.round(pt1.x) || Math.round(pt2.x)==Math.round(p.x)) {
            return;
        }
        if(p!=undefined){
            spec.points.push(p);
            randomMidDisplace(pt1, p);
            randomMidDisplace(p, pt2);
        }
    }

    let api = {
        generateTerrain: generateTerrain,
        reset: reset,
        get pointsLen() { return spec.pointsLen; },
        get points() { return spec.points; },
        get bumpiness() { return spec.bumpiness; },
        get platformWidth() { return terrain.platformWidth; },
        get startPoint() { return terrain.startPoint; },
        get endPoint() { return terrain.endPoint; },
        get platformStart() { return terrain.platformStart; },
        get platformEnd() { return terrain.platformEnd },
    };

    return api;
}