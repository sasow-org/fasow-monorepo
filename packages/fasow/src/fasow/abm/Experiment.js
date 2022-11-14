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
        main_1.TowerHandler.setRepetition(-1);
    }
    /**
     * Run the Experiment,initializing the model and starting the simulation
     * */
    Experiment.prototype.run = function () {
        this.initialize();
        console.log("Ended Initialization --> On Experiment.run(), currentRepetition  is: ", this.getRepetition(), " of (", this.getMaxRepetition(), ")");
        while (this.canNextRepetition()) {
            if (!this.simulation.isDone()) {
                break;
            }
            console.log("Starting Simulation...");
            this.simulation.run();
            this.initialize();
        }
    };
    /**
     * Initialize the Model, setting up the configs to TowerHandler
     */
    Experiment.prototype.initialize = function () {
        this.loadConfig();
        this.simulation.initialize(this.nextRepetition());
    };
    /**
     * Setting up the ExperimentConfig, creating the simulation
     * @param config : MetaExperimentConfig :
     */
    Experiment.prototype.setConfig = function (config) {
        this.name = config.name;
        this.description = config.description;
        this.simulation = new Simulation_1["default"]();
        this.setMaxRepetition(config.maxRepetitions);
    };
    /**
     * Load the configuration, delivered by the TowerHandler
     */
    Experiment.prototype.loadConfig = function () {
        var config = main_1.TowerHandler.getExperimentConfig();
        this.setConfig(config);
    };
    /**
     * Call to Strategy to be executed
     */
    Experiment.prototype.executeStrategy = function () {
        console.log("Executing Strategy");
        this.Strategy();
    };
    /**
     * Return the Repetition of the Experiment
     */
    Experiment.prototype.getRepetition = function () {
        return main_1.TowerHandler.getRepetition();
    };
    /**
     * Return the max Repetitions to do the Experiment
     */
    Experiment.prototype.getMaxRepetition = function () {
        return main_1.TowerHandler.getMaxRepetition();
    };
    /**
     * Return true if is posible to do another repetition
     */
    Experiment.prototype.canNextRepetition = function () {
        return main_1.TowerHandler.canNextRepetition();
    };
    /**
     * Update the repetition number to +1
     */
    Experiment.prototype.nextRepetition = function () {
        return main_1.TowerHandler.nextRepetition();
    };
    /**
     * Allow to set the max repetitions
     * @param maxRepetitions : number : The quantity of repetitions to execute the Experiment
     */
    Experiment.prototype.setMaxRepetition = function (maxRepetitions) {
        main_1.TowerHandler.setMaxRepetition(maxRepetitions);
    };
    return Experiment;
}());
exports["default"] = Experiment;
