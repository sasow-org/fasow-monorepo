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
exports.__esModule = true;
var EnvironmentTwitter_1 = require("../../fasow/scenarios/twitter/EnvironmentTwitter");
var main_1 = require("../../main");
var EffectTwitter = /** @class */ (function (_super) {
    __extends(EffectTwitter, _super);
    function EffectTwitter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.postOfCompanies = 4;
        _this.periodsToShare = [];
        return _this;
    }
    EffectTwitter.prototype.run = function () {
        this.calculatePeriodsToRepost();
        console.log("PostOfCompanies: ", this.postOfCompanies);
        console.log("Periods to Repost: ", this.periodsToShare);
        _super.prototype.run.call(this);
    };
    EffectTwitter.prototype.calculatePeriodsToRepost = function () {
        for (var i = 0; i < this.postOfCompanies; i += 1) {
            var periodToShare = Math.round(Math.random() * (main_1.TimeKeeper.getMaxTick() - 1));
            this.periodsToShare.push(periodToShare);
        }
    };
    EffectTwitter.prototype.isAPeriodToReShare = function () {
        var period = main_1.TimeKeeper.getTick();
        var auxBool = false;
        this.periodsToShare.forEach(function (p) {
            if (period === p) {
                auxBool = true;
            }
        });
        return auxBool;
    };
    EffectTwitter.prototype.step = function () {
        if (main_1.TimeKeeper.getTick() > 0 && this.isAPeriodToReShare()) {
            console.log("ReSending");
            this.resetSeedStates();
        }
        _super.prototype.step.call(this);
    };
    EffectTwitter.prototype.createEnvironment = function (environmentConfig) {
        return new EffectTwitter().setConfig(environmentConfig);
    };
    return EffectTwitter;
}(EnvironmentTwitter_1["default"]));
exports["default"] = EffectTwitter;
