// We have to provide a Promise polyfill if we're targeting older browsers
// because import() returns a promise which resolves once the module is loaded
import ES6Promise = require("es6-promise");

ES6Promise.polyfill();

interface Require {
    constructor(c: string): Require;

    ensure(d: string[], c: Function): void;
}

declare const require: Require;

async function renderWidget() {
    // Locate the widget container
    const container = document.getElementById("widget");

    // If we found the container, import the widget and render it into the container
    if (container !== null) {
        const widget = await import(/* webpackChunkName: "widget" */ "./widget");
        widget.render(container);

        const widget2:any = ()=>import(/* webpackChunkName: "widget2" */ "./widget2");
        widget2().then((w:any)=>w.render(container));
    }


}

renderWidget();
