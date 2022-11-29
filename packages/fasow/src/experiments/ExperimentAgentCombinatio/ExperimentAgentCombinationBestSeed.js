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
var main_1 = require("../../main");
var ActionRead_1 = require("../../fasow/abm/wom/custom-actions/ActionRead");
var TwitterAgent_1 = require("../../fasow/scenarios/twitter/TwitterAgent");
var ActionShare_1 = require("../../fasow/abm/wom/custom-actions/ActionShare");
var AgentState_1 = require("../../fasow/abm/interfaces/Agent/AgentState");
var EnvironmentTwitter_1 = require("../../fasow/scenarios/twitter/EnvironmentTwitter");
var DataHandlerDecorators_1 = require("../../fasow/datahandler/decorators/DataHandlerDecorators");
var ExperimentAgentCombinationBestSeed = /** @class */ (function (_super) {
    __extends(ExperimentAgentCombinationBestSeed, _super);
    function ExperimentAgentCombinationBestSeed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // who is the better seed ?
        // avr --> hub --> leader
        _this.seedType = "hub";
        _this.seedFollowerPercentage = 0;
        _this.nonSeedPercentage = 95;
        _this.seedPercentage = 5;
        return _this;
    }
    ExperimentAgentCombinationBestSeed.getActionsConfig = function (type) {
        var configRead = {
            id: 0,
            name: "default-read",
            type: ActionRead_1.default,
            probability: 0.5,
        };
        switch (type) {
            case "hub":
                return [configRead, {
                        id: 1,
                        name: "read-".concat(type),
                        type: ActionShare_1.default,
                        probability: 19.3,
                    }];
            case "leader":
                return [configRead, {
                        id: 1,
                        name: "read-".concat(type),
                        type: ActionShare_1.default,
                        probability: 25.09,
                    }];
            default:
                return [configRead, {
                        id: 1,
                        name: "read-".concat(type),
                        type: ActionShare_1.default,
                        probability: 19.3,
                    }];
        }
    };
    /*
        run() {
            const seedTypes : string[] = ["average", "hub", "leader"];
            const followerPercentageByType : number[] = [0.057, 1.14225, 1.08];
            for(let i = 0; i < seedTypes.length; i++){
                const type = seedTypes[i];
                const followerPercentage = followerPercentageByType[i];
                TimeKeeper.setMaxRepetition(1);
                console.log("The selected seed type is --> ", type);
                this.seedType = type;
                this.seedFollowerPercentage = followerPercentage;
                super.run();
                TimeKeeper.resetRepetitions();
            }
        }
    */
    ExperimentAgentCombinationBestSeed.prototype.Strategy = function () {
        var nonSeedConfig = {
            id: 0,
            name: "average",
            isSeed: false,
            type: TwitterAgent_1.default,
            percentage: this.nonSeedPercentage,
            state: AgentState_1.AgentState.NOT_READ,
            followersPercentage: 0.057,
            actionsConfigs: ExperimentAgentCombinationBestSeed.getActionsConfig("average")
        };
        /*
        const seedConfig : MetaAgentConfig = {
            id: 1,
            name: this.seedType,
            type: TwitterAgent,
            percentage: this.seedPercentage,
            state: AgentState.READY_TO_SHARE,
            followersPercentage: this.seedFollowerPercentage,
            isSeed: true,
            actionsConfigs: ExperimentAgentCombinationBestSeed.getActionsConfig(this.seedType)
        } */
        var seedConfig = {
            id: 1,
            name: "hub",
            isSeed: true,
            type: TwitterAgent_1.default,
            percentage: this.seedPercentage,
            state: AgentState_1.AgentState.READY_TO_SHARE,
            followersPercentage: 1.14225,
            actionsConfigs: ExperimentAgentCombinationBestSeed.getActionsConfig("hub")
        };
        main_1.TowerHandler.setExperimentName("best seed type ?");
        main_1.TowerHandler.setExperimentDescription("Who are the best seed type ?");
        main_1.TowerHandler.setScenarioConfig({
            networkSize: 10000,
            maxTick: 20,
            environmentType: EnvironmentTwitter_1.default,
            metaAgentsConfigs: [nonSeedConfig, seedConfig],
        });
        main_1.TimeKeeper.setMaxRepetition(1);
    };
    ExperimentAgentCombinationBestSeed.prototype.createExperiment = function () {
        return new ExperimentAgentCombinationBestSeed();
    };
    __decorate([
        (0, DataHandlerDecorators_1.ExperimentCount)("seed-type"),
        __metadata("design:type", String)
    ], ExperimentAgentCombinationBestSeed.prototype, "seedType", void 0);
    return ExperimentAgentCombinationBestSeed;
}(Experiment_1.default));
exports.default = ExperimentAgentCombinationBestSeed;
