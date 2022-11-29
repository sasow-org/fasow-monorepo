"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../../main");
/**
 * The Simulation class handle the initialization of the Environment and start it
 */
var Simulation = /** @class */ (function () {
    function Simulation() {
        this.id = -1;
    }
    /**
     * Starts the simulation to being executed period per period
     */
    Simulation.prototype.run = function () {
        this.environment.run();
    };
    /**
     * Initializes the simulation creating an environment and configuring it
     * @param id : number : Correspond to the repetition of the simulation was executed
     */
    Simulation.prototype.initialize = function (id) {
        this.id = id;
        this.environment = main_1.TowerHandler.generateEnvironment(main_1.TowerHandler.getScenarioConfig());
        this.environment.initialize();
    };
    /**
     * Checks if the Environment is Ready to be executed or not
     */
    Simulation.prototype.isDone = function () {
        return this.environment.isDone();
    };
    return Simulation;
}());
exports.default = Simulation;
