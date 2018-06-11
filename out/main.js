"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// We have to provide a Promise polyfill if we're targeting older browsers
// because import() returns a promise which resolves once the module is loaded
var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
function renderWidget() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var container, widget, widget2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = document.getElementById("widget");
                    if (!(container !== null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require(/* webpackChunkName: "widget" */ "./widget"); })];
                case 1:
                    widget = _a.sent();
                    widget.render(container);
                    widget2 = function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "widget" */ "./widget2"); }); };
                    widget2().then(function (w) { return w.render(container); });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
renderWidget();
