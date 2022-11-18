"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../../../main");
var Environment_1 = require("../../abm/Environment");
var EnvironmentTwitter = /** @class */ (function (_super) {
    __extends(EnvironmentTwitter, _super);
    function EnvironmentTwitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnvironmentTwitter.prototype.run = function () {
        while (main_1.TimeKeeper.canNextTick()) {
            this.step();
            console.log("On Step: ", main_1.TimeKeeper.nextTick(), " of (", main_1.TimeKeeper.getMaxTick(), "): \n", main_1.DataHandler.getLastOutputRow());
            // console.log("On Step: ", this.getTick(), " of (", this.getMaxTick(), ")");
            //
            console.log();
        }
    };
    EnvironmentTwitter.prototype.step = function () {
        this.agents.forEach(function (agent) {
            agent.step();
        });
    };
    EnvironmentTwitter.prototype.createEnvironment = function (scenarioConfig) {
        return new EnvironmentTwitter().setConfig(scenarioConfig);
    };
    return EnvironmentTwitter;
}(Environment_1.default));
exports.default = EnvironmentTwitter;
