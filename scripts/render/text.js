// ------------------------------------------------------------------
//
// Rendering function for a /components/text object.
//
// ------------------------------------------------------------------
Midterm.graphics.Text = (function(graphics) {
    'use strict';
    let that = {};

    that.render = function(text) {
        graphics.core.drawText(text);
    };

    return that;
}(Midterm.graphics));
