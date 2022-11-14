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
var Agent_1 = require("../../abm/Agent");
var AgentState_1 = require("../../abm/interfaces/Agent/AgentState");
var DataHandlerDecorators_1 = require("../../datahandler/decorators/DataHandlerDecorators");
var TwitterAgent = /** @class */ (function (_super) {
    __extends(TwitterAgent, _super);
    function TwitterAgent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TwitterAgent.prototype.step = function () {
        if (this.state === TwitterAgent.READY) {
            this.share();
            this.state = TwitterAgent.SHARED;
        }
    };
    TwitterAgent.prototype.createAgent = function (id, agentData) {
        return new TwitterAgent().setConfig(id, agentData);
    };
    TwitterAgent.prototype.update = function (message) {
        var _this = this;
        this.actions.forEach(function (action) { return action.execute(_this); });
        return message;
    };
    TwitterAgent.NOT_READ = AgentState_1.AgentState.NOT_READ;
    TwitterAgent.READ = AgentState_1.AgentState.READ;
    TwitterAgent.READY = AgentState_1.AgentState.READY_TO_SHARE;
    TwitterAgent.SHARED = AgentState_1.AgentState.SHARED;
    __decorate([
        (0, DataHandlerDecorators_1.AgentStateIntegerCount)("NOT_READ", AgentState_1.AgentState.NOT_READ),
        __metadata("design:type", Number)
    ], TwitterAgent, "NOT_READ");
    __decorate([
        (0, DataHandlerDecorators_1.AgentStateIntegerCount)("READ", AgentState_1.AgentState.READ),
        __metadata("design:type", Number)
    ], TwitterAgent, "READ");
    __decorate([
        (0, DataHandlerDecorators_1.AgentStateIntegerCount)("READY_TO_SHARE", AgentState_1.AgentState.READY_TO_SHARE),
        __metadata("design:type", Number)
    ], TwitterAgent, "READY");
    __decorate([
        (0, DataHandlerDecorators_1.AgentStateIntegerCount)("SHARED", AgentState_1.AgentState.SHARED),
        __metadata("design:type", Number)
    ], TwitterAgent, "SHARED");
    return TwitterAgent;
}(Agent_1["default"]));
exports["default"] = TwitterAgent;
