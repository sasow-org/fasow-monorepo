"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../../main");
/*
Es la capa n ́ucleo y la capa m ́as alta de la
arquitectura reflexiva de FASOW. Esta capa permite el control
del tiempo y es la que permite que los agentes ejecuten sus
acciones de manera correcta, esta capa no posee una API para
modificar los par ́ametros internos de la capa, pero si posee
m ́etodos para servir de informaci ́on a las capas inferiores como
por ejemplo para obtener el tick actual de la simulaci ́on.
 */
var ITimeKeeper = /** @class */ (function () {
    function ITimeKeeper() {
        this.maxTick = -1;
        this.tick = -1;
        this.repetition = -1;
        this.maxRepetition = -1;
    }
    /**
     * set the tick of the clock of the simulation
     * @param tick : number : unit of time of the simulation
     */
    ITimeKeeper.prototype.setTick = function (tick) {
        this.tick = tick;
        return this.tick;
    };
    /**
     * returns the current tick of the clock of the simulation
     */
    ITimeKeeper.prototype.getTick = function () {
        return this.tick;
    };
    /**
     * Forces a tick update, updating is value +1 and calling the DataHandler to register the data of the simulation
     */
    ITimeKeeper.prototype.nextTick = function () {
        main_1.DataHandler.update();
        this.tick += 1;
        return this.tick;
    };
    /**
     * returns true as long as the clock Tick is less than maxTick
     */
    ITimeKeeper.prototype.canNextTick = function () {
        return this.tick < this.maxTick;
    };
    /**
     * set the duration of the simulation
     * @param maxTick : number : the simulation will be executed while the tick be less than the maxTick
     */
    ITimeKeeper.prototype.setMaxTick = function (maxTick) {
        this.maxTick = maxTick;
    };
    /**
     * return the duration of the simulation
     */
    ITimeKeeper.prototype.getMaxTick = function () {
        return this.maxTick;
    };
    /**
     * Allows to set the repetition of the Experiment, this will hardly be called
     * @param repetition : number : The number that indicate the actual repetition of the experiment
     */
    ITimeKeeper.prototype.setRepetition = function (repetition) {
        this.repetition = repetition;
    };
    /**
     * Return the Repetition of the Experiment
     */
    ITimeKeeper.prototype.getRepetition = function () {
        return this.repetition;
    };
    /**
     * Updates the repetition number to +1
     */
    ITimeKeeper.prototype.nextRepetition = function () {
        this.repetition += 1;
        return this.repetition;
    };
    /**
     * Returns true if is possible to do another repetition
     */
    ITimeKeeper.prototype.canNextRepetition = function () {
        return this.repetition < this.maxRepetition;
    };
    /**
     * Allows to set the max repetitions
     * @param maxRepetitions : number : The quantity of repetitions to execute the Experiment
     */
    ITimeKeeper.prototype.setMaxRepetition = function (maxRepetition) {
        this.maxRepetition = maxRepetition;
    };
    /**
     * Return the max Repetitions to do the Experiment
     */
    ITimeKeeper.prototype.getMaxRepetition = function () {
        return this.maxRepetition;
    };
    ITimeKeeper.prototype.resetRepetitions = function () {
        this.repetition = -1;
    };
    return ITimeKeeper;
}());
exports.default = ITimeKeeper;
