"use strict";
exports.__esModule = true;
var main_1 = require("../../main");
var Simulation_1 = require("./Simulation");
/**
 * The Experiment abstract class allow to the user to Implement and Configure an Experiment overriding the Strategy Method
 */
var Experiment = /** @class */ (function () {
    function Experiment() {
        this.name = "";
        this.description = "";
        this.simulation = new Simulation_1["default"]();
    }
    /**
     * Run the Experiment,initializing the model and starting the simulation
     * */
    Experiment.prototype.run = function () {
        this.initialize();
        main_1.TimeKeeper.setRepetition(0);
        console.log("Ended Initialization --> On Experiment.run(), currentRepetition  is: ", main_1.TimeKeeper.getRepetition() + 1, " of (", main_1.TimeKeeper.getMaxRepetition(), ")");
        while (main_1.TimeKeeper.canNextRepetition()) {
            if (!this.simulation.isDone()) {
                break;
            }
            console.log("Starting Simulation...");
            this.simulation.run();
            console.log("Ending Simulation...");
            main_1.TimeKeeper.nextRepetition();
            if (main_1.TimeKeeper.canNextRepetition()) {
                this.initialize();
                console.log("Ended Initialization --> On Experiment.run(), currentRepetition  is: ", main_1.TimeKeeper.getRepetition() + 1, " of (", main_1.TimeKeeper.getMaxRepetition(), ")");
            }
        }
        console.log("Ending Experiment...");
    };
    /**
     * Initialize the Model, setting up the configs to TowerHandler
     */
    Experiment.prototype.initialize = function () {
        console.log("Starting initialization...");
        this.executeStrategy();
        if (main_1.TimeKeeper.canNextRepetition()) {
            this.loadConfig();
            this.simulation.initialize(main_1.TimeKeeper.getRepetition());
        }
    };
    /**
     * Setting up the ExperimentConfig, creating the simulation
     * @param config : MetaExperimentConfig :
     */
    Experiment.prototype.setConfig = function (config) {
        this.name = config.name;
        this.description = config.description;
        this.simulation = new Simulation_1["default"]();
        main_1.TimeKeeper.setMaxRepetition(config.maxRepetitions);
    };
    /**
     * Load the configuration, delivered by the TowerHandler
     */
    Experiment.prototype.loadConfig = function () {
        var config = main_1.TowerHandler.getExperimentConfig();
        this.setConfig(config);
    };
    /**
     * Calls to Strategy to be executed
     */
    Experiment.prototype.executeStrategy = function () {
        console.log("Executing Strategy");
        this.Strategy();
    };
    return Experiment;
}());
exports["default"] = Experiment;
