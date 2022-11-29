"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionAPI_1 = require("../apis/ActionAPI");
var AgentAPI_1 = require("../apis/AgentAPI");
var EnvironmentAPI_1 = require("../apis/EnvironmentAPI");
var ExperimentAPI_1 = require("../apis/ExperimentAPI");
var ITowerHandler = /** @class */ (function () {
    function ITowerHandler() {
        // private timeKeeper: TimeKeeper = new TimeKeeper();
        this.ActionAPI = new ActionAPI_1.default();
        this.AgentAPI = new AgentAPI_1.default();
        this.EnvironmentAPI = new EnvironmentAPI_1.default();
        this.ExperimentAPI = new ExperimentAPI_1.default();
    }
    // todo : add all the others methods per API or introspection layer
    /* Essential API
  
    getTick(): number {
      return this.timeKeeper.getTick();
    }
  
    setTick(tick: number): number {
      return this.timeKeeper.setTick(tick);
    }
  
    setMaxTick(periods: number) {
      this.timeKeeper.setMaxTick(periods);
    }
  
    nextTick(): number {
      return this.timeKeeper.nextTick();
    }
  
    canNextTick(): boolean {
      return this.timeKeeper.canNextTick();
    }
  
    getMaxTick(): number {
      return this.timeKeeper.getMaxTick();
    }
  
    getRepetition(): number {
      return this.timeKeeper.getRepetition();
    }
  
    getMaxRepetition(): number {
      return this.timeKeeper.getMaxRepetition();
    }
  
    canNextRepetition(): boolean {
      return this.timeKeeper.canNextRepetition();
    }
  
    nextRepetition(): number {
      return this.timeKeeper.nextRepetition();
    }
  
    setMaxRepetition(maxRepetitions: number) {
      console.log(
        "Setting up MaxRepetitions from (",
        this.getMaxRepetition(),
        ") to (",
        maxRepetitions,
        "). "
      );
      this.timeKeeper.setMaxRepetition(maxRepetitions);
    }
  
    setRepetition(repetition: number) {
      this.timeKeeper.setRepetition(repetition);
    }
    */
    /* Essential API */
    /* Action API */
    ITowerHandler.prototype.registerNewAction = function (newActionType) {
        this.ActionAPI.registerNewAction(newActionType);
    };
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
    ITowerHandler.prototype.registerMetaConfigs = function (metaAgentsConfigs) {
        this.AgentAPI.registerMetaConfigs(metaAgentsConfigs);
    };
    ITowerHandler.prototype.registerNewMetaAgentConfig = function (agentConfig) {
        this.AgentAPI.registerNewMetaAgentConfig(agentConfig);
    };
    ITowerHandler.prototype.generateAgentsByConfigs = function (metaConfigs) {
        return this.AgentAPI.generateAgentsByConfigs(metaConfigs);
    };
    ITowerHandler.prototype.generateAgentList = function () {
        return this.AgentAPI.generateAgentList();
    };
    ITowerHandler.prototype.getMetaAgentConfigById = function (indexMetaAgentConfig) {
        return this.AgentAPI.getMetaAgentConfigById(indexMetaAgentConfig);
    };
    ITowerHandler.prototype.registerNewAgent = function (newAgentType) {
        this.AgentAPI.registerNewAgent(newAgentType);
    };
    ITowerHandler.prototype.registerMetaAgentsConfigs = function (metaAgentsConfigs) {
        this.AgentAPI.registerMetaConfigs(metaAgentsConfigs);
    };
    /* Agent API */
    /* Scenario API */
    ITowerHandler.prototype.generateEnvironment = function (config) {
        return this.EnvironmentAPI.generateEnvironment(config);
    };
    ITowerHandler.prototype.getScenarioConfig = function () {
        return this.EnvironmentAPI.getScenarioConfig();
    };
    ITowerHandler.prototype.registerNewEnvironment = function (newEnvironmentType) {
        this.EnvironmentAPI.registerNewEnvironment(newEnvironmentType);
    };
    ITowerHandler.prototype.setNetworkToScenario = function (environment) {
        this.EnvironmentAPI.setNetworkToScenario(environment);
    };
    ITowerHandler.prototype.addAgentToScenario = function (agentConfig) {
        this.EnvironmentAPI.addAgentToScenario(agentConfig);
    };
    ITowerHandler.prototype.setNetworkSizeToScenario = function (size) {
        this.EnvironmentAPI.setNetworkSizeToScenario(size);
    };
    ITowerHandler.prototype.setPeriodsToScenario = function (max) {
        this.EnvironmentAPI.setPeriodsToScenario(max);
    };
    ITowerHandler.prototype.setScenarioConfig = function (scenarioConfig) {
        this.EnvironmentAPI.setScenarioConfig(scenarioConfig);
    };
    ITowerHandler.prototype.resetScenarioConfig = function () {
        return this.EnvironmentAPI.resetScenarioConfig();
    };
    /* Scenario API */
    /* Experiment API */
    ITowerHandler.prototype.setExperimentName = function (name) {
        this.ExperimentAPI.setExperimentName(name);
    };
    ITowerHandler.prototype.setExperimentMaxRepetitions = function (maxRepetitions) {
        this.ExperimentAPI.setExperimentMaxRepetitions(maxRepetitions);
    };
    ITowerHandler.prototype.setExperimentDescription = function (description) {
        this.ExperimentAPI.setExperimentDescription(description);
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
    /*
    createExperiment(type: typeof Experiment): Experiment {
      return this.ExperimentAPI.createExperiment(type);
    } */
    ITowerHandler.prototype.createSelectedExperiment = function () {
        return this.ExperimentAPI.createSelectedExperiment();
    };
    ITowerHandler.prototype.selectExperimentByName = function (experiment) {
        this.ExperimentAPI.selectExperimentByName(experiment);
    };
    /* Experiment API */
    /* FASOW STATE FUNCTIONS */
    ITowerHandler.prototype.getActionAPIState = function () {
        return this.ActionAPI.getState();
    };
    ITowerHandler.prototype.getAgentAPIState = function () {
        return this.AgentAPI.getState();
    };
    ITowerHandler.prototype.getEnvironmentAPIState = function () {
        return this.EnvironmentAPI.getState();
    };
    ITowerHandler.prototype.getExperimentAPIState = function () {
        return this.ExperimentAPI.getState();
    };
    ITowerHandler.prototype.getSelectedExperiment = function () {
        return this.ExperimentAPI.getSelectedExperiment();
    };
    return ITowerHandler;
}());
exports.default = ITowerHandler;
// const TowerHandler: ITowerHandler = new ITowerHandler();
// export default TowerHandler;
