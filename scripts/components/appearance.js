Frogger.components.Appearance = function(spec) {
    'use strict';

    let api = {
        get name() { return 'appearance'; },
        get spriteSheet() { return spec.spriteSheet; },
        get pixelWidth() { return spec.spriteSheet.width / spec.spriteCount; },
        get pixelHeight() { return spec.spriteSheet.height; },
        get width() { return spec.spriteSize.width; },
        get height() { return spec.spriteSize.height; },
        get sprite() { return spec.sprite; },
        set sprite(value){spec.sprite = value;}
    };

    return api;
};
