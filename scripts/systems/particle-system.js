Frogger.systems.ParticleSystem = (function() {
    'use strict';
    //------------------------------------------------------------------
    //
    // This creates one new particle
    //
    //------------------------------------------------------------------
    let particles = [];
    let lastTimeStamp = performance.now();

    function Particle(spec) {
        spec.size = 1/15;
        spec.alive = 0;

        function update(elapsedTime) {
            //
            // We work with time in seconds, elapsedTime comes in as milliseconds
            elapsedTime = elapsedTime / 1000;
            //
            // Update how long it has been alive
            spec.alive += elapsedTime;

            //
            // Update its x
            spec.x += (elapsedTime * spec.speed * spec.direction.x);
            spec.y += (elapsedTime * spec.speed * spec.direction.y);

            //
            // Rotate proportional to its speed
            spec.rotation += (spec.speed / 3000);

            //
            // Return true if this particle is still alive
            return (spec.alive < spec.lifetime);
        };

        let api = {
            update: update,
            get x() { return spec.x; },
            get y() { return spec.y; },
            get size() { return spec.size; },
            get rotation() { return spec.rotation; },
            get image() { return Frogger.assets.splat; },
            get stroke() { return 'rgba(0, 0, 0, 1)'; }
        };

        return api;
    }

    //------------------------------------------------------------------
    //
    // Update the state of all particles.  This includes removing any that have exceeded their lifetime.
    //
    //------------------------------------------------------------------
    function update(elapsedTime, entities) {
        //elapsedTime = elapsedTime / 1000;
        // We work with time in seconds, elapsedTime comes in as milliseconds

        for (let id in entities) {
            let entity = entities[id];
            if(entity.components.collision.killed && entity.components.frog){
                
                let particle = 0;
                let aliveParticles = [];

                // Go through and update each of the currently alive particles
                aliveParticles.length = 0;
                for (particle = 0; particle < particles.length; particle++) {
                    //
                    // A return value of true indicates this particle is still alive
                    if (particles[particle].update(elapsedTime)) {
                        aliveParticles.push(particles[particle]);
                    }
                }
                particles = aliveParticles;

                // Generate some new particles
                for (particle = 0; particle < 8; particle++) {
                    let p = {
                        x: entity.components.position.x+entity.components.appearance.width/2, y: entity.components.position.y+entity.components.appearance.height/2,
                        direction: Random.nextCircleVector(),
                        speed: Random.nextGaussian(1, 1/5), // pixels per second
                        rotation: 0,
                        lifetime:  Random.nextGaussian(1, 1/5)    // seconds
                    };

                    //console.log('p: ', p);

                    particles.push(Particle(p));
                }
            }
            else if(!entity.components.collision.killed && entity.components.frog){
                particles = [];
            }
            
        }
    }

    let api = {
        update: update,
        get particles() { return particles; }
    };

    return api;
}());
