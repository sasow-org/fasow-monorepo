"use strict";
exports.__esModule = true;
var ExampleExperiment_1 = require("../../../experiments/ExampleExperiment");
var main_1 = require("../../../main");
/*
Es la capa de introduccion que permite usar un
lenguaje familiar para personas que trabajan en marketing
WOM. Al mismo tiempo ofrece un primer acceso para
implementar un modelo a estudiar. En esta capa se define
el proposito de la simulacion seleccionando a los grupos
de agentes que se necesitan, el ambiente que se desea y
se ingresa la informacion sobre como se espera realizar la
simulacion. Aquı se puede seleccionar una gran variedad de
configuraciones predefinidas, estas configuraciones o datos son
entregados por las capas superiores de la torre a traves del
uso de sus APIs asociadas. Al agregar nuevas caracterısticas
que requiera modificar la estructura basica de FASOW, los
cambios se deben realizar en primera instancia en la capa de
Experiment para luego a medida que sea necesario ir efectuando
estos cambios en las capas superiores de la torre de reflexion
haciendo uso del TowerHandler.
 */
var IExperimentAPI = /** @class */ (function () {
    function IExperimentAPI() {
        this.experimentConfig = {
            id: 0,
            name: "",
            description: "",
            maxRepetitions: -1,
            detailedData: false,
            essentialData: false
        };
        this.experimentList = new Map();
    }
    /* Strategy Handlers */
    IExperimentAPI.prototype.registerNewExperiment = function (exp) {
        // @ts-ignore
        // eslint-disable-next-line new-cap
        this.experimentList.set(exp.name, exp);
    };
    /* Strategy Handlers */
    /* Configure Experiment */
    IExperimentAPI.prototype.setExperimentName = function (name) {
        this.experimentConfig.name = name;
    };
    IExperimentAPI.prototype.setExperimentDescription = function (description) {
        this.experimentConfig.description = description;
    };
    IExperimentAPI.prototype.setExperimentMaxRepetitions = function (maxRepetitions) {
        main_1.TowerHandler.setMaxRepetition(maxRepetitions);
        this.experimentConfig.maxRepetitions = maxRepetitions;
    };
    IExperimentAPI.prototype.setDetailedData = function (state) {
        this.experimentConfig.detailedData = state;
    };
    IExperimentAPI.prototype.setEssentialData = function (state) {
        this.experimentConfig.essentialData = state;
    };
    /* Configure Experiment */
    // todo : method to search in experiments array and set the strategy
    IExperimentAPI.prototype.run = function () {
        // console.log("Strategy", this.strategy);
        // todo handle with a trycatch if the experiments is undefined
        console.log("Selected Experiment: ", this.selectedExperiment);
        var exp = this.createSelectedExperiment();
        main_1.DataHandler.experiment = exp;
        exp.executeStrategy();
        exp.run();
        main_1.DataHandler.writeCSVFile();
    };
    IExperimentAPI.prototype.getExperimentConfig = function () {
        return {
            id: this.experimentConfig.id,
            name: this.experimentConfig.name,
            type: ExampleExperiment_1["default"],
            description: this.experimentConfig.description,
            essentialData: this.experimentConfig.essentialData,
            detailedData: this.experimentConfig.detailedData,
            maxRepetitions: main_1.TowerHandler.getMaxRepetition(),
            scenarioConfig: main_1.TowerHandler.getScenarioConfig()
        };
    };
    IExperimentAPI.prototype.createExperiment = function (type) {
        // @ts-ignore
        // eslint-disable-next-line new-cap
        return this.experimentList.get(type).createExperiment();
    };
    IExperimentAPI.prototype.createSelectedExperiment = function () {
        // eslint-disable-next-line new-cap
        return new this.selectedExperiment();
    };
    IExperimentAPI.prototype.selectExperiment = function (selected) {
        this.selectedExperiment = this.experimentList.get(selected.name);
    };
    return IExperimentAPI;
}());
exports["default"] = IExperimentAPI;
