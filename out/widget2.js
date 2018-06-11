"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function render(container) {
    // Imagine lots of widget code here.
    // For this demo, $.text() will have to do.
    container.innerHTML = container.innerHTML + "  Hello, World2!";
}
exports.render = render;
