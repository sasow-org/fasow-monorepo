"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExampleExperiment_1 = require("../experiments/ExampleExperiment");
var ActionRead_1 = require("./abm/wom/custom-actions/ActionRead");
var ActionShare_1 = require("./abm/wom/custom-actions/ActionShare");
var IDataHandler_1 = require("./datahandler/IDataHandler");
var ITowerHandler_1 = require("./reflection/tower/ITowerHandler");
var FacebookAgent_1 = require("./scenarios/facebook/FacebookAgent");
var EnvironmentTwitter_1 = require("./scenarios/twitter/EnvironmentTwitter");
var TwitterAgent_1 = require("./scenarios/twitter/TwitterAgent");
var ITimeKeeper_1 = require("./timekepper/ITimeKeeper");
var FASOW = /** @class */ (function () {
    function FASOW() {
        this.dataHandler = new IDataHandler_1.default();
        this.towerHandler = new ITowerHandler_1.default();
        this.timeKeeper = new ITimeKeeper_1.default();
        this.loadActions();
        this.loadAgents();
        this.loadEnvironments();
        this.loadExperiments();
    }
    FASOW.prototype.loadActions = function () {
        console.log("Loading Actions...");
        this.towerHandler.registerNewAction(ActionRead_1.default);
        this.towerHandler.registerNewAction(ActionShare_1.default);
    };
    FASOW.prototype.loadAgents = function () {
        console.log("Loading Agents...");
        this.towerHandler.registerNewAgent(TwitterAgent_1.default);
        this.towerHandler.registerNewAgent(FacebookAgent_1.default);
    };
    FASOW.prototype.loadEnvironments = function () {
        console.log("Loading Environments...");
        this.towerHandler.registerNewEnvironment(EnvironmentTwitter_1.default);
        // TowerHandler.registerNewEnvironment(EnvironmentFacebook);
    };
    FASOW.prototype.loadExperiments = function () {
        console.log("Loading Experiments...");
        this.towerHandler.registerNewExperiment(ExampleExperiment_1.default);
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
    FASOW.prototype.getState = function () {
        return this.dataHandler.getState();
    };
    FASOW.prototype.runExperiment = function (experiment) {
        this.towerHandler.selectExperiment(experiment);
        // console.log("Selected Experiment: ", experiment.name);
        this.privateRunExperiment();
    };
    FASOW.prototype.runExperimentByName = function (experiment) {
        this.towerHandler.selectExperimentByName(experiment);
        // console.log("Selected Experiment: ", experiment);
        this.privateRunExperiment();
    };
    FASOW.prototype.selectExperiment = function (experiment) {
        this.towerHandler.selectExperiment(experiment);
    };
    FASOW.prototype.selectExperimentByName = function (experiment) {
        this.towerHandler.selectExperimentByName(experiment);
    };
    FASOW.prototype.runSelectedExperiment = function () {
        this.privateRunExperiment();
    };
    FASOW.prototype.privateRunExperiment = function () {
        // todo : method to search in experiments array and set the strategy
        // todo : move this method to other class like FASOW ?
        // todo : maybe we need to move too the method select experiment or maybe allow to call that method from other class like fasow also
        // todo handle with a trycatch if the experiments is undefined
        var exp = this.towerHandler.createSelectedExperiment();
        this.dataHandler.experiment = exp;
        // exp.executeStrategy();
        exp.run();
        this.dataHandler.writeCSVFile();
    };
    FASOW.prototype.registerNewExperiment = function (experiment) {
        this.towerHandler.registerNewExperiment(experiment);
    };
    FASOW.prototype.writeFASOWState = function () {
        this.dataHandler.writeFASOWState();
    };
    return FASOW;
}());
exports.default = FASOW;
