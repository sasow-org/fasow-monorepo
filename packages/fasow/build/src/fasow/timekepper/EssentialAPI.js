"use strict";
exports.__esModule = true;
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
var EssentialAPI = /** @class */ (function () {
    function EssentialAPI() {
        this.maxTick = -1;
        this.tick = -1;
        this.repetition = -1;
        this.maxRepetition = -1;
    }
    EssentialAPI.prototype.setTick = function (tick) {
        this.tick = tick;
        return this.tick;
    };
    EssentialAPI.prototype.getTick = function () {
        return this.tick;
    };
    EssentialAPI.prototype.nextTick = function () {
        main_1.DataHandler.update();
        this.tick += 1;
        return this.tick;
    };
    EssentialAPI.prototype.canNextTick = function () {
        return this.tick < this.maxTick;
    };
    EssentialAPI.prototype.setMaxTick = function (maxTick) {
        this.maxTick = maxTick;
    };
    EssentialAPI.prototype.getMaxTick = function () {
        return this.maxTick;
    };
    EssentialAPI.prototype.setRepetition = function (repetition) {
        this.repetition = repetition;
    };
    EssentialAPI.prototype.getRepetition = function () {
        return this.repetition;
    };
    EssentialAPI.prototype.nextRepetition = function () {
        this.repetition += 1;
        return this.repetition;
    };
    EssentialAPI.prototype.canNextRepetition = function () {
        return this.repetition < this.maxRepetition;
    };
    EssentialAPI.prototype.setMaxRepetition = function (maxRepetition) {
        this.maxRepetition = maxRepetition;
    };
    EssentialAPI.prototype.getMaxRepetition = function () {
        return this.maxRepetition;
    };
    return EssentialAPI;
}());
exports["default"] = EssentialAPI;
