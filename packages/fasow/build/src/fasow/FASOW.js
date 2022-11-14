"use strict";
exports.__esModule = true;
var ExampleExperiment_1 = require("../experiments/ExampleExperiment");
var ActionRead_1 = require("./abm/wom/custom-actions/ActionRead");
var ActionShare_1 = require("./abm/wom/custom-actions/ActionShare");
var IDataHandler_1 = require("./datahandler/IDataHandler");
var ITowerHandler_1 = require("./reflection/tower/ITowerHandler");
var EnvironmentTwitter_1 = require("./scenarios/twitter/EnvironmentTwitter");
var TwitterAgent_1 = require("./scenarios/twitter/TwitterAgent");
var FASOW = /** @class */ (function () {
    function FASOW() {
        this.dataHandler = new IDataHandler_1["default"]();
        this.towerHandler = new ITowerHandler_1["default"]();
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
        // TowerHandler.registerNewAgent(FacebookAgent);
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
    return FASOW;
}());
exports["default"] = FASOW;
