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
var Experiment_1 = require("../../fasow/abm/Experiment");
var AgentState_1 = require("../../fasow/abm/interfaces/Agent/AgentState");
var main_1 = require("../../main");
var CanSaturatedActionRead_1 = require("./CanSaturatedActionRead");
var CanSaturatedActionShare_1 = require("./CanSaturatedActionShare");
var EffectAgent_1 = require("./EffectAgent");
var EnvironmentEffectTwitter_1 = require("./EnvironmentEffectTwitter");
var MessageRepetition = /** @class */ (function (_super) {
    __extends(MessageRepetition, _super);
    function MessageRepetition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // eslint-disable-next-line class-methods-use-this
    MessageRepetition.prototype.Strategy = function () {
        // todo : check if the probabilities are correct
        main_1.TowerHandler.registerNewAction(CanSaturatedActionShare_1.default);
        main_1.TowerHandler.registerNewAction(CanSaturatedActionRead_1.default);
        main_1.TowerHandler.registerNewAgent(EffectAgent_1.default);
        main_1.TowerHandler.registerNewEnvironment(EnvironmentEffectTwitter_1.default);
        var actionReadConfig = {
            id: 0,
            name: "read",
            type: CanSaturatedActionRead_1.default,
            probability: 6.3,
        };
        var actionShareConfig = {
            id: 1,
            name: "share",
            type: CanSaturatedActionShare_1.default,
            probability: 5,
        };
        var avrAgentConfig = {
            id: 0,
            followersPercentage: 0.01306,
            actionsConfigs: [actionReadConfig, actionShareConfig],
            name: "possible saturated agent",
            type: EffectAgent_1.default,
            percentage: 95,
            state: AgentState_1.AgentState.NOT_READ,
            isSeed: false,
        };
        var avrAgentConfigSeed = {
            id: 1,
            followersPercentage: 0.01306,
            actionsConfigs: [actionReadConfig, actionShareConfig],
            name: "possible saturated agent",
            type: EffectAgent_1.default,
            percentage: 5,
            isSeed: true,
            state: AgentState_1.AgentState.READY_TO_SHARE,
        };
        main_1.TowerHandler.setExperimentName("Effect of Message Repetition");
        main_1.TowerHandler.setExperimentDescription("This experiment is for analyze the effect of message repetition in twitter agents on wom marketing campaings");
        main_1.TowerHandler.setScenarioConfig({
            networkSize: 10000,
            environmentType: EnvironmentEffectTwitter_1.default,
            maxTick: 40,
            metaAgentsConfigs: [avrAgentConfig, avrAgentConfigSeed],
        });
        main_1.TimeKeeper.setMaxRepetition(1);
    };
    MessageRepetition.prototype.createExperiment = function () {
        return new MessageRepetition();
    };
    return MessageRepetition;
}(Experiment_1.default));
exports.default = MessageRepetition;
