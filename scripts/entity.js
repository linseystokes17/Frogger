// --------------------------------------------------------------
//
// This is an Entity factory.  An Entity is an 'id' (a number) and
// a collection of components.
//
// --------------------------------------------------------------
Midterm.Entity = (function() {
    'use strict';
    let nextId = 1;

    function createEntity(id, position) {
        let components = {};

        function addComponent(c) {
            components[c.name] = c;
        }

        function removeComponent(c) {
            delete components[c.name];
        }

        return {
            id: id,
            position: position,
            addComponent: addComponent,
            removeComponent: removeComponent,
            get components() { return components; },
            set components(value){components = value;}
        };
    }

    let api = {
        get nextId() { return nextId; },
        set nextId(value) {nextId = value;},
        get position(){return this.position; },
        set position(value){this.position = value;},
        createEntity: createEntity,
    };

    return api;
}());
