'use strict';

Frogger.enums.Direction = Object.freeze({
    Stopped: 'stopped',
    Up: 'up',
    Down: 'down',
    Left: 'left',
    Right: 'right'
});

Frogger.enums.Event = Object.freeze({
    ConsumeFood: 'consume-food',
    HitSomething: 'hit-something'
});

Frogger.enums.Input = Object.freeze({
    KeyboardControlled: 'keyboard-controlled'
});
