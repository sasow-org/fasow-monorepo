"use strict";
exports.__esModule = true;
var EssentialAPI_1 = require("../../timekepper/EssentialAPI");
var ActionAPI_1 = require("../apis/ActionAPI");
var AgentAPI_1 = require("../apis/AgentAPI");
var ExperimentAPI_1 = require("../apis/ExperimentAPI");
var ScenarioAPI_1 = require("../apis/ScenarioAPI");
var ITowerHandler = /** @class */ (function () {
    function ITowerHandler() {
        this.EssentialAPI = new EssentialAPI_1["default"]();
        this.ActionAPI = new ActionAPI_1["default"]();
        this.AgentAPI = new AgentAPI_1["default"]();
        this.ScenarioAPI = new ScenarioAPI_1["default"]();
        this.ExperimentAPI = new ExperimentAPI_1["default"]();
        /* Experiment API */
    }
    // todo : add all the others methods per API or introspection layer
    /* Essential API */
    ITowerHandler.prototype.getTick = function () {
        return this.EssentialAPI.getTick();
    };
    ITowerHandler.prototype.setTick = function (tick) {
        return this.EssentialAPI.setTick(tick);
    };
    ITowerHandler.prototype.setMaxTick = function (periods) {
        this.EssentialAPI.setMaxTick(periods);
    };
    ITowerHandler.prototype.nextTick = function () {
        return this.EssentialAPI.nextTick();
    };
    ITowerHandler.prototype.canNextTick = function () {
        return this.EssentialAPI.canNextTick();
    };
    ITowerHandler.prototype.getMaxTick = function () {
        return this.EssentialAPI.getMaxTick();
    };
    ITowerHandler.prototype.getRepetition = function () {
        return this.EssentialAPI.getRepetition();
    };
    ITowerHandler.prototype.getMaxRepetition = function () {
        return this.EssentialAPI.getMaxRepetition();
    };
    ITowerHandler.prototype.canNextRepetition = function () {
        return this.EssentialAPI.canNextRepetition();
    };
    ITowerHandler.prototype.nextRepetition = function () {
        return this.EssentialAPI.nextRepetition();
    };
    ITowerHandler.prototype.setMaxRepetition = function (maxRepetitions) {
        console.log("Setting up MaxRepetitions from (", this.getMaxRepetition(), ") to (", maxRepetitions, "). ");
        this.EssentialAPI.setMaxRepetition(maxRepetitions);
    };
    ITowerHandler.prototype.setRepetition = function (repetition) {
        this.EssentialAPI.setRepetition(repetition);
    };
    /* Essential API */
    /* Action API */
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.registerNewAction = function (newActionType) {
        this.ActionAPI.registerNewAction(newActionType);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.generateActions = function (actionsConfigs) {
        return this.ActionAPI.generateActions(actionsConfigs);
    };
    ITowerHandler.prototype.registerMetaActionConfig = function (actionConfig) {
        this.ActionAPI.registerMetaActionConfig(actionConfig);
    };
    ITowerHandler.prototype.generateActionList = function () {
        return this.ActionAPI.generateActionList();
    };
    ITowerHandler.prototype.getMetaConfigs = function () {
        return this.ActionAPI.getMetaConfigs();
    };
    /* Action API */
    /* Agent API */
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.registerMetaConfigs = function (metaAgentsConfigs) {
        this.AgentAPI.registerMetaConfigs(metaAgentsConfigs);
    };
    ITowerHandler.prototype.registerNewMetaAgentConfig = function (agentConfig) {
        this.AgentAPI.registerNewMetaAgentConfig(agentConfig);
    };
    ITowerHandler.prototype.generateAgentsByConfigs = function (metaConfigs) {
        return this.AgentAPI.generateAgentsByConfigs(metaConfigs);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.generateAgentList = function () {
        return this.AgentAPI.generateAgentList();
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.getMetaAgentConfigById = function (indexMetaAgentConfig) {
        return this.AgentAPI.getMetaAgentConfigById(indexMetaAgentConfig);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.registerNewAgent = function (newAgentType) {
        this.AgentAPI.registerNewAgent(newAgentType);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.registerMetaAgentsConfigs = function (metaAgentsConfigs) {
        this.AgentAPI.registerMetaConfigs(metaAgentsConfigs);
    };
    /* Agent API */
    /* Scenario API */
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.generateEnvironment = function (config) {
        return this.ScenarioAPI.generateEnvironment(config);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.getScenarioConfig = function () {
        return this.ScenarioAPI.getScenarioConfig();
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.registerNewEnvironment = function (newEnvironmentType) {
        this.ScenarioAPI.registerNewEnvironment(newEnvironmentType);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setNetworkToScenario = function (environment) {
        this.ScenarioAPI.setNetworkToScenario(environment);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.addAgentToScenario = function (agentConfig) {
        this.ScenarioAPI.addAgentToScenario(agentConfig);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setNetworkSizeToScenario = function (size) {
        this.ScenarioAPI.setNetworkSizeToScenario(size);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setPeriodsToScenario = function (max) {
        this.ScenarioAPI.setPeriodsToScenario(max);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setScenarioConfig = function (scenarioConfig) {
        this.ScenarioAPI.setScenarioConfig(scenarioConfig);
    };
    ITowerHandler.prototype.resetScenarioConfig = function () {
        return this.ScenarioAPI.resetScenarioConfig();
    };
    /* Scenario API */
    /* Experiment API */
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.run = function () {
        this.ExperimentAPI.run();
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setExperimentName = function (name) {
        this.ExperimentAPI.setExperimentName(name);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setExperimentMaxRepetitions = function (maxRepetitions) {
        this.ExperimentAPI.setExperimentMaxRepetitions(maxRepetitions);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setExperimentDescription = function (description) {
        this.ExperimentAPI.setExperimentDescription(description);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setEssentialData = function (state) {
        this.ExperimentAPI.setEssentialData(state);
    };
    // eslint-disable-next-line class-methods-use-this
    ITowerHandler.prototype.setDetailedData = function (state) {
        this.ExperimentAPI.setDetailedData(state);
    };
    ITowerHandler.prototype.registerNewExperiment = function (experiment) {
        this.ExperimentAPI.registerNewExperiment(experiment);
    };
    ITowerHandler.prototype.selectExperiment = function (select) {
        this.ExperimentAPI.selectExperiment(select);
    };
    ITowerHandler.prototype.getExperimentConfig = function () {
        return this.ExperimentAPI.getExperimentConfig();
    };
    ITowerHandler.prototype.createExperiment = function (type) {
        return this.ExperimentAPI.createExperiment(type);
    };
    return ITowerHandler;
}());
exports["default"] = ITowerHandler;
// const TowerHandler: ITowerHandler = new ITowerHandler();
// export default TowerHandler;
