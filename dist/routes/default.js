"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const vio_1 = require('vio');
class Default extends vio_1.Controller {
    default() {
        return {
            title: "dasda",
            content: 'Keep calm and read the doc!'
        };
    }
}
__decorate([
    vio_1.get()
], Default.prototype, "default", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Default;
//# sourceMappingURL=default.js.map