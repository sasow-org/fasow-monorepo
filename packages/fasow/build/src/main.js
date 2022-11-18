"use strict";
exports.__esModule = true;
exports.loadJSON = exports.TimeKeeper = exports.TowerHandler = exports.DataHandler = void 0;
var ExperimentAgentCombination_1 = require("./experiments/ExperimentAgentCombinatio/ExperimentAgentCombination");
var MessageRepetition_1 = require("./experiments/ExperimentEffectMessageRepetition/MessageRepetition");
var FASOW_1 = require("./fasow/FASOW");
// FASOW es el sistema que se debe exportar el cual tiene al backend
var fasow = new FASOW_1["default"]();
/*
    Los siguientes tres exports corresponden a
    DataHandler : Permite generar el output y el estado del backend.
    TowerHandler : La torre de reflexion que permite controlar la arquitectura
    TimeKepper : Modulo que maneja el tiempo (ticks y repeticiones)

    Estos 3 exports son utilizados por el backend para funcionar
    y no debieran ser usados por el frontend.

 */
exports.DataHandler = fasow.getDataHandler();
exports.TowerHandler = fasow.getTowerHandler();
exports.TimeKeeper = fasow.getTimeKeeper();
fasow.registerNewExperiment(MessageRepetition_1["default"]);
fasow.registerNewExperiment(ExperimentAgentCombination_1["default"]);
// fasow.runExperimentByName("ExperimentAgentCombination");
// console.log(fasow.getState());
function loadJSON() { }
exports.loadJSON = loadJSON;
exports["default"] = fasow;
