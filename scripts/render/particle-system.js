// --------------------------------------------------------------
//
// Renders the particles in a particle system
//
// --------------------------------------------------------------
Midterm.graphics.ParticleSystem = (function(graphics, systems) {
    'use strict';

    //------------------------------------------------------------------
    //
    // Render all particles
    //
    //------------------------------------------------------------------
    function render() {

        Object.getOwnPropertyNames(systems.ParticleSystem.particles).forEach( function(value) {
            if(value!='length'){
                let particle = systems.ParticleSystem.particles[value];
                graphics.core.drawTexture(particle);
            }
        });
    }

    let api = {
        render: render
    };

    return api;
}(Midterm.graphics, Midterm.systems));
