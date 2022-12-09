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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
var TwitterAgent_1 = require("../../fasow/scenarios/twitter/TwitterAgent");
var DataHandlerDecorators_1 = require("../../fasow/datahandler/decorators/DataHandlerDecorators");
var EffectAgent = /** @class */ (function (_super) {
    __extends(EffectAgent, _super);
    function EffectAgent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isSaturated = false;
        _this.times_read_counter = 0;
        return _this;
    }
    EffectAgent.prototype.step = function () {
        _super.prototype.step.call(this);
    };
    EffectAgent.prototype.createAgent = function (id, agentData) {
        return new EffectAgent().setConfig(id, agentData);
    };
    EffectAgent.saturationThreshold = 3;
    __decorate([
        (0, DataHandlerDecorators_1.AgentCountBoolean)("saturated", false),
        __metadata("design:type", Boolean)
    ], EffectAgent.prototype, "isSaturated");
    return EffectAgent;
}(TwitterAgent_1["default"]));
exports["default"] = EffectAgent;
