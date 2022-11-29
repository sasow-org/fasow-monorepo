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
Object.defineProperty(exports, "__esModule", { value: true });
var Experiment_1 = require("../../fasow/abm/Experiment");
var AgentState_1 = require("../../fasow/abm/interfaces/Agent/AgentState");
var ActionRead_1 = require("../../fasow/abm/wom/custom-actions/ActionRead");
var ActionShare_1 = require("../../fasow/abm/wom/custom-actions/ActionShare");
var EnvironmentTwitter_1 = require("../../fasow/scenarios/twitter/EnvironmentTwitter");
var TwitterAgent_1 = require("../../fasow/scenarios/twitter/TwitterAgent");
var main_1 = require("../../main");
var DataHandlerDecorators_1 = require("../../fasow/datahandler/decorators/DataHandlerDecorators");
var ExperimentAgentCombination = /** @class */ (function (_super) {
    __extends(ExperimentAgentCombination, _super);
    function ExperimentAgentCombination() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.percentageAvr = 0;
        _this.finalPercentageHub = 0;
        _this.finalPercentageLeader = 0;
        _this.percentageTypes = "";
        return _this;
    }
    ExperimentAgentCombination.getMetaConfig = function (name, percentage, seed, state) {
        var configRead = {
            id: 0,
            name: "default-read",
            type: ActionRead_1.default,
            probability: 50,
        };
        switch (name) {
            case "hub":
                return {
                    id: 0,
                    name: "hub",
                    type: TwitterAgent_1.default,
                    percentage: percentage,
                    isSeed: seed,
                    state: state,
                    followersPercentage: 1.14225,
                    actionsConfigs: [
                        configRead,
                        {
                            id: 1,
                            name: "action-share-hub",
                            type: ActionShare_1.default,
                            probability: 19.3,
                        },
                    ],
                };
            case "leader":
                return {
                    id: 1,
                    name: "leader",
                    type: TwitterAgent_1.default,
                    percentage: percentage,
                    isSeed: seed,
                    state: state,
                    followersPercentage: 1.08,
                    actionsConfigs: [
                        configRead,
                        {
                            id: 1,
                            name: "action-share-leader",
                            type: ActionShare_1.default,
                            probability: 25.09,
                        },
                    ],
                };
            default:
                return {
                    id: 2,
                    type: TwitterAgent_1.default,
                    percentage: percentage,
                    isSeed: seed,
                    state: state,
                    name: "average",
                    followersPercentage: 0.057,
                    actionsConfigs: [
                        configRead,
                        {
                            id: 1,
                            name: "action-share-avr",
                            type: ActionShare_1.default,
                            probability: 19.3,
                        },
                    ],
                };
        }
    };
    ExperimentAgentCombination.prototype.run = function () {
        for (var i = 10; i < 100; i += 10) {
            main_1.TimeKeeper.setMaxRepetition(1);
            var percentageHubOfSeed = i;
            var percentageLeaderOfSeed = 100 - i;
            console.log("Calculating Percentages of seeds Combinations");
            console.log("Hub: ", percentageHubOfSeed, "Leader: ", percentageLeaderOfSeed);
            var seedPercentage = 5;
            this.finalPercentageHub = (percentageHubOfSeed * seedPercentage) / 100;
            this.finalPercentageLeader =
                (percentageLeaderOfSeed * seedPercentage) / 100;
            this.percentageAvr = 95;
            this.percentageTypes = "Hub: ".concat(this.finalPercentageHub, " Leader: ").concat(this.finalPercentageLeader, " Average: ").concat(this.percentageAvr);
            console.log("Finals Agents Percentages: ");
            console.log(this.percentageTypes);
            _super.prototype.run.call(this);
            main_1.TimeKeeper.resetRepetitions();
        }
    };
    ExperimentAgentCombination.prototype.Strategy = function () {
        var avrConfig = ExperimentAgentCombination.getMetaConfig("average", this.percentageAvr, false, AgentState_1.AgentState.NOT_READ);
        var hubConfig = ExperimentAgentCombination.getMetaConfig("hub", this.finalPercentageHub, true, AgentState_1.AgentState.READY_TO_SHARE);
        var leaderConfig = ExperimentAgentCombination.getMetaConfig("leader", this.finalPercentageLeader, true, AgentState_1.AgentState.READY_TO_SHARE);
        main_1.TowerHandler.setExperimentName("seed-combinations");
        main_1.TowerHandler.setExperimentDescription("Experiment to analyze what is the best agent combination to get more retweets");
        main_1.TowerHandler.setScenarioConfig({
            networkSize: 10000,
            maxTick: 20,
            environmentType: EnvironmentTwitter_1.default,
            metaAgentsConfigs: [avrConfig, hubConfig, leaderConfig],
        });
    };
    // eslint-disable-next-line class-methods-use-this
    ExperimentAgentCombination.prototype.createExperiment = function () {
        return new ExperimentAgentCombination();
    };
    __decorate([
        (0, DataHandlerDecorators_1.ExperimentCount)("percentage-type"),
        __metadata("design:type", String)
    ], ExperimentAgentCombination.prototype, "percentageTypes", void 0);
    return ExperimentAgentCombination;
}(Experiment_1.default));
exports.default = ExperimentAgentCombination;
