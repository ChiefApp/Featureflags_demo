"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const FFModuleHelper_1 = require('../../FFModuleHelper');
let ff = new FFModuleHelper_1.FFModuleHelper("WEB", "http://localhost:1337", undefined);
class FeaturePage {
    constructor() {
        //   ff.getFeature("das","1").then(f => {
        //         console.log(f);
        //   })
    }
    valueOfFeature() {
        return this.flag.then(feature => {
            console.log("Feature is:" + feature);
            return feature;
        });
    }
}
__decorate([
    ff.Feature("Dashboard", "1")
], FeaturePage.prototype, "flag", void 0);
exports.FeaturePage = FeaturePage;
//# sourceMappingURL=FeaturePage.js.map