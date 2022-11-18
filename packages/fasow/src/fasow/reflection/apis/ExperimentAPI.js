"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExampleExperiment_1 = require("../../../experiments/ExampleExperiment");
var main_1 = require("../../../main");
var StructureHandler_1 = require("../StructureHandler");
/**
 * Es la capa de introduccion que permite usar un
 * lenguaje familiar para personas que trabajan en marketing
 * WOM. Al mismo tiempo ofrece un primer acceso para
 * implementar un modelo a estudiar. En esta capa se define
 * el proposito de la simulacion seleccionando a los grupos
 * de agentes que se necesitan, el ambiente que se desea y
 * se ingresa la informacion sobre como se espera realizar la
 * simulacion. Aquı se puede seleccionar una gran variedad de
 * configuraciones predefinidas, estas configuraciones o datos son
 * entregados por las capas superiores de la torre a traves del
 * uso de sus APIs asociadas. Al agregar nuevas caracterısticas
 * que requiera modificar la estructura basica de FASOW, los
 * cambios se deben realizar en primera instancia en la capa de
 * Experiment para luego a medida que sea necesario ir efectuando
 * estos cambios en las capas superiores de la torre de reflexion
 * haciendo uso del TowerHandler.
 */
var IExperimentAPI = /** @class */ (function () {
    function IExperimentAPI() {
        this.experimentConfig = {
            id: 0,
            name: "",
            description: "",
            maxRepetitions: -1,
        };
        this.experimentList = new Map();
    }
    /* Strategy Handlers */
    IExperimentAPI.prototype.registerNewExperiment = function (exp) {
        // todo : maybe you need to handle what happen if you try to add some experiment and that already has been added
        // @ts-ignore
        // eslint-disable-next-line new-cap
        if (!this.experimentList.has(exp)) {
            this.experimentList.set(exp.name, exp);
            return;
        }
        throw Error("The referenced Experiment type '".concat(exp, "' has already been added"));
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
        main_1.TimeKeeper.setMaxRepetition(maxRepetitions);
        this.experimentConfig.maxRepetitions = maxRepetitions;
    };
    /* Configure Experiment */
    IExperimentAPI.prototype.getExperimentConfig = function () {
        return {
            id: this.experimentConfig.id,
            name: this.experimentConfig.name,
            type: ExampleExperiment_1.default,
            description: this.experimentConfig.description,
            maxRepetitions: main_1.TimeKeeper.getMaxRepetition(),
            environmentConfig: main_1.TowerHandler.getScenarioConfig(),
        };
    };
    IExperimentAPI.prototype.createExperiment = function (type) {
        // @ts-ignore
        return this.experimentList.get(type).createExperiment();
    };
    IExperimentAPI.prototype.createSelectedExperiment = function () {
        return Reflect.construct(this.selectedExperiment, []);
    };
    IExperimentAPI.prototype.selectExperiment = function (selected) {
        if (this.experimentList.has(selected.name)) {
            this.selectedExperiment = selected;
            return;
        }
        throw Error("The referenced type '".concat(selected, "' not exist in ExperimentAPI"));
    };
    IExperimentAPI.prototype.getSelectedExperiment = function () {
        return this.selectedExperiment;
    };
    IExperimentAPI.prototype.getState = function () {
        console.log("ExperimentAPI.state: ");
        var excludedProps = ["simulation"];
        var outputState = [];
        this.experimentList.forEach(function (type) {
            var expectedObject = Reflect.construct(type, []);
            console.log("Name: ", type.name);
            outputState.push({
                type: type.name,
                properties: (0, StructureHandler_1.getTypesOfObject)(expectedObject, excludedProps),
            });
        });
        return outputState;
    };
    IExperimentAPI.prototype.selectExperimentByName = function (experiment) {
        if (this.experimentList.has(experiment)) {
            // @ts-ignore
            this.selectedExperiment = this.experimentList.get(experiment);
            return;
        }
        throw Error("The referenced type '".concat(experiment, "' not exist in ExperimentAPI"));
    };
    return IExperimentAPI;
}());
exports.default = IExperimentAPI;
