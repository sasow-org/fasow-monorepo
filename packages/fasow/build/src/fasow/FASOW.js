"use strict";
exports.__esModule = true;
var ExampleExperiment_1 = require("../experiments/ExampleExperiment");
var ActionRead_1 = require("./abm/wom/custom-actions/ActionRead");
var ActionShare_1 = require("./abm/wom/custom-actions/ActionShare");
var IDataHandler_1 = require("./datahandler/IDataHandler");
var ITowerHandler_1 = require("./reflection/tower/ITowerHandler");
var FacebookAgent_1 = require("./scenarios/facebook/FacebookAgent");
var EnvironmentTwitter_1 = require("./scenarios/twitter/EnvironmentTwitter");
var TwitterAgent_1 = require("./scenarios/twitter/TwitterAgent");
var ITimeKeeper_1 = require("./timekepper/ITimeKeeper");
/*
todo : maybe the loads actions,agents,environments, agents, could be better
  creating 4 classes with one method that allow to call towerHandler and register all of them´s.
 */
var FASOW = /** @class */ (function () {
    function FASOW() {
        this.dataHandler = new IDataHandler_1["default"]();
        this.towerHandler = new ITowerHandler_1["default"]();
        this.timeKeeper = new ITimeKeeper_1["default"]();
        this.experiment = undefined;
        this.loadActions();
        this.loadAgents();
        this.loadEnvironments();
        this.loadExperiments();
    }
    FASOW.prototype.loadActions = function () {
        console.log("Loading Actions...");
        this.towerHandler.registerNewAction(ActionRead_1["default"]);
        this.towerHandler.registerNewAction(ActionShare_1["default"]);
    };
    FASOW.prototype.loadAgents = function () {
        console.log("Loading Agents...");
        this.towerHandler.registerNewAgent(TwitterAgent_1["default"]);
        this.towerHandler.registerNewAgent(FacebookAgent_1["default"]);
    };
    FASOW.prototype.loadEnvironments = function () {
        console.log("Loading Environments...");
        this.towerHandler.registerNewEnvironment(EnvironmentTwitter_1["default"]);
        // TowerHandler.registerNewEnvironment(EnvironmentFacebook);
    };
    FASOW.prototype.loadExperiments = function () {
        console.log("Loading Experiments...");
        this.towerHandler.registerNewExperiment(ExampleExperiment_1["default"]);
    };
    FASOW.prototype.getDataHandler = function () {
        return this.dataHandler;
    };
    FASOW.prototype.getTowerHandler = function () {
        return this.towerHandler;
    };
    FASOW.prototype.getTimeKeeper = function () {
        return this.timeKeeper;
    };
    /**
     * Returns a "snapshot" of fasow.
     * The format given is the following:
     *
     * state: {
     *     actions:[
     *         {propertyKey: string, propertyType: boolean|string|number}
     *     ],
     *     agents:[
     *         {propertyKey: string, propertyType: boolean|string|number}
     *     ],
     *     environments:[
     *         {propertyKey: string, propertyType: boolean|string|number}
     *     ],
     *     experiments:[
     *         {propertyKey: string, propertyType: boolean|string|number}
     *     ],
     *     agent_states:[
     *         {propertyKey: string, column_name: string, value: number}
     *     ]
     * }
     */
    FASOW.prototype.getState = function () {
        return this.dataHandler.getState();
    };
    FASOW.prototype.runExperiment = function (experiment) {
        this.towerHandler.selectExperiment(experiment);
        // console.log("Selected Experiment: ", experiment.name);
        this.privateRunExperiment();
    };
    /**
     * Runs an experiment by his name, this process is
     * 1.- select the experiment by his name
     * 2.- run selected experiment.
     *
     * Remember check if the experiment are registered in fasow or only use
     * strings given by fasow.getState().
     * @param experiment
     */
    FASOW.prototype.runExperimentByName = function (experiment) {
        this.towerHandler.selectExperimentByName(experiment);
        // console.log("Selected Experiment: ", experiment);
        this.privateRunExperiment();
    };
    /**
     * Select experiment by his "class" or "type".
     * This method is usually used for debugging the backend.
     * @param experiment : Experiment : Some typeof Experiment.
     */
    FASOW.prototype.selectExperiment = function (experiment) {
        this.towerHandler.selectExperiment(experiment);
    };
    /**
     * Select some experiment by the name.
     * Before selecting some experiment by his name, check if the experiment
     * is registered in fasow. Other way without errors is, only select
     * experiments by name given by fasow.getState().
     * @param experiment
     */
    FASOW.prototype.selectExperimentByName = function (experiment) {
        this.towerHandler.selectExperimentByName(experiment);
    };
    /**
     * Runs the selected experiment, if not exists any selected experiment
     * the execution would can be stopped for Null or Undefined reference.
     */
    FASOW.prototype.runSelectedExperiment = function () {
        this.privateRunExperiment();
        // todo : check if any exception is thrown when running run with no experiment selected
    };
    FASOW.prototype.privateRunExperiment = function () {
        // todo : method to search in experiments array and set the strategy
        // todo : move this method to other class like FASOW ?
        // todo : maybe we need to move too the method select experiment or maybe allow to call that method from other class like fasow also
        // todo handle with a trycatch if the experiments is undefined
        this.dataHandler.experiment = this.experiment;
        // exp.executeStrategy();
        // @ts-ignore
        this.experiment.run();
        this.dataHandler.writeCSVFile();
    };
    /**
     * Registers a new Experiment, that can be executed after.
     * @param experiment :  Experiment : The class of the experiment to be registered
     */
    FASOW.prototype.registerNewExperiment = function (experiment) {
        this.towerHandler.registerNewExperiment(experiment);
    };
    /**
     * Calls to fasow to write a csv file.
     */
    FASOW.prototype.writeFASOWState = function () {
        // todo : frontend dont have filesystem think a better way to return a JSON with the data
        this.dataHandler.writeFASOWState();
    };
    /**
     * Returns the output generated by the simulation
     */
    FASOW.prototype.getOutput = function () {
        return this.dataHandler.getOutput();
    };
    /**
     * Clears the output generated by the datahandler and then returns that
     */
    FASOW.prototype.clearDataHandlerOutput = function () {
        return this.clearDataHandlerOutput();
    };
    /**
     * Return the last iteration state of the simulation
     */
    FASOW.prototype.getLastOutputRow = function () {
        return this.dataHandler.getLastOutputRow();
    };
    FASOW.prototype.initializeSelectedExperiment = function () {
        this.experiment = this.towerHandler.createSelectedExperiment();
        this.experiment.initialize();
        return this.experiment;
    };
    FASOW.prototype.getExperimentConfig = function () {
        return this.towerHandler.getExperimentConfig();
    };
    return FASOW;
}());
exports["default"] = FASOW;
