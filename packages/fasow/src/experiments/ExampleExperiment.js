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
var Experiment_1 = require("../fasow/abm/Experiment");
var AgentState_1 = require("../fasow/abm/interfaces/Agent/AgentState");
var ActionRead_1 = require("../fasow/abm/wom/custom-actions/ActionRead");
var ActionShare_1 = require("../fasow/abm/wom/custom-actions/ActionShare");
var EnvironmentTwitter_1 = require("../fasow/scenarios/twitter/EnvironmentTwitter");
var TwitterAgent_1 = require("../fasow/scenarios/twitter/TwitterAgent");
var main_1 = require("../main");
var ExampleExperiment = /** @class */ (function (_super) {
    __extends(ExampleExperiment, _super);
    function ExampleExperiment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // eslint-disable-next-line class-methods-use-this
    ExampleExperiment.prototype.Strategy = function () {
        var agent1 = {
            id: 0,
            name: "seed",
            isSeed: true,
            state: AgentState_1.AgentState.READY_TO_SHARE,
            type: TwitterAgent_1["default"],
            percentage: 5,
            followersPercentage: 3,
            followingsPercentage: 0,
            actionsConfigs: [
                {
                    id: 0,
                    name: "read1",
                    type: ActionRead_1["default"],
                    probability: 5
                },
                {
                    id: 1,
                    name: "share",
                    type: ActionShare_1["default"],
                    probability: 5
                },
            ]
        };
        var agent2 = {
            id: 1,
            name: "non-seeds",
            isSeed: false,
            state: AgentState_1.AgentState.NOT_READ,
            type: TwitterAgent_1["default"],
            percentage: 95,
            followingsPercentage: 3,
            followersPercentage: 3,
            actionsConfigs: [
                {
                    id: 0,
                    name: "read1",
                    type: ActionRead_1["default"],
                    probability: 5
                },
                {
                    id: 1,
                    name: "share",
                    type: ActionShare_1["default"],
                    probability: 5
                },
            ]
        };
        main_1.TowerHandler.setScenarioConfig({
            networkSize: 1000,
            maxTick: 10,
            environmentType: EnvironmentTwitter_1["default"],
            metaAgentsConfigs: [agent1, agent2]
        });
        main_1.TowerHandler.setExperimentName("Experiment-Example");
        main_1.TowerHandler.setExperimentMaxRepetitions(2);
        main_1.TowerHandler.setExperimentDescription("Nothing");
    };
    // eslint-disable-next-line class-methods-use-this
    ExampleExperiment.prototype.createExperiment = function () {
        return new ExampleExperiment();
    };
    return ExampleExperiment;
}(Experiment_1["default"]));
exports["default"] = ExampleExperiment;
