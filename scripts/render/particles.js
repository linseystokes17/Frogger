
Midterm.graphics.Particles = (function (graphics, spec) {
    'use strict';
    let that = {};
    let particles = [];

    function create(spec) {
        let that = {};

        spec.fill = 'rgb(255, 255, 255)';
        spec.stroke = 'rgb(0, 0, 0)';
        spec.alive = 0;

        that.update = function(elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            spec.rotation += spec.speed * 0.5;

            return spec.alive < spec.lifetime;
        };

        that.draw = function(spec) {
            //graphics.drawRectangle(spec);
            spec.particles.center.x = spec.image.x + spec.image.width/2;
            spec.particles.center.y = spec.image.y + spec.image.height/2;

            graphics.core.drawTexture(spec.particles.image, spec.particles.center, spec.particles.rotation, spec.particles.size);
        };

        return that;
    }

    that.update = function(elapsedTime, spec) {
        let keepMe = [];
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;

        for (let particle = 0; particle < 5; particle++) {
            let size = Math.abs(Random.nextGaussian(spec.particles.size.mean, spec.particles.size.stdev));
            let p = create({
                image: spec.image,
                center: { x: spec.particles.center.x, y: spec.particles.center.y },
                size: {x: size, y: size},
                rotation: 0,
                speed: Random.nextGaussian(spec.particles.speed.mean, spec.particles.speed.stdev),
                direction: Random.nextCircleVector(),
                lifetime: Random.nextGaussian(spec.particles.lifetime.mean, spec.particles.lifetime.stdev)
            });
            particles.push(p);
        }
    };

    that.render = function(spec, elapsedTime) {
        for (let p = particles.length - 1; p >= 0; p--) {
            particles[p].update(elapsedTime);
            particles[p].draw(spec);
        }
    };

    return that;
        
}(Midterm.graphics));
