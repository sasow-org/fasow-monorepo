"use strict";
exports.__esModule = true;
var StructureHandler_1 = require("../StructureHandler");
/*
Esta capa es el nivel siguiente de Experiment.
Dado que esta capa permite configurar escenarios aquí se encuentra una
colección de configuraciones de agentes, ambientes y acciones predefinidas
que pueden ser accedidas por la API de la capa. También se pueden configurar
nuevos escenarios o nuevos ambientes y relacionar a un conjunto de agentes
con el entorno a simular para lograr esto se utiliza a TowerHandler
para comunicar los niveles de las capas. De igual forma que en Experiment
al agregar cambios en la torre de reflexión para agregar nuevas características,
 se deben realizar cambios en este nivel de la torre si el modelo lo requiere.
 */
var EnvironmentAPI = /** @class */ (function () {
    function EnvironmentAPI() {
        // Setting up the environment Factories
        // this.environmentFactories = new Map<
        //   typeof Environment,
        //   IEnvironmentCreator
        // >();
        this.environmentFactories = new Map();
        // Setting up the scenario config.
        this.scenarioConfig = {
            metaAgentsConfigs: [],
            networkSize: 0,
            periods: 0,
            seedSize: 0,
            environmentType: undefined
        };
    }
    /*
    Metodos para registrar clases?
     */
    EnvironmentAPI.prototype.registerNewEnvironment = function (newEnvironmentType) {
        /* this.environmentFactories.set(
          newEnvironmentType,
          // @ts-ignore
          // eslint-disable-next-line new-cap
          new newEnvironmentType()
        ); */
        if (!this.environmentFactories.has(newEnvironmentType.name)) {
            this.environmentFactories.set(newEnvironmentType.name, newEnvironmentType);
        }
        else {
            throw Error("The referenced type '".concat(newEnvironmentType, "' has really been added"));
        }
    };
    EnvironmentAPI.prototype.getEnvironment = function (environmentType) {
        if (this.environmentFactories.has(environmentType.name)) {
            // @ts-ignore
            return this.environmentFactories.get(environmentType.name);
        }
        throw Error("The referenced type '".concat(environmentType, "' not exist in EnvironmentAPI"));
    };
    EnvironmentAPI.prototype.generateEnvironment = function (config) {
        var factoryRef = Reflect.construct(this.getEnvironment(config.environmentType), []);
        if (factoryRef) {
            var createEnvironment = factoryRef.createEnvironment;
            return createEnvironment(config);
        }
        throw new Error("Environment Type ".concat(config.environmentType, " not exist in ScenarioAPI"));
    };
    /*
    Metodos para configurar el scenario?
     */
    EnvironmentAPI.prototype.setNetworkToScenario = function (environment) {
        this.scenarioConfig.environmentType = environment;
    };
    EnvironmentAPI.prototype.addAgentToScenario = function (agentConfig) {
        this.scenarioConfig.metaAgentsConfigs.push(agentConfig);
    };
    EnvironmentAPI.prototype.setNetworkSizeToScenario = function (size) {
        this.scenarioConfig.networkSize = size;
    };
    EnvironmentAPI.prototype.setPeriodsToScenario = function (max) {
        this.scenarioConfig.periods = max;
    };
    EnvironmentAPI.prototype.setScenarioConfig = function (scenarioConfig) {
        this.scenarioConfig = scenarioConfig;
    };
    EnvironmentAPI.prototype.getScenarioConfig = function () {
        return this.scenarioConfig;
    };
    EnvironmentAPI.prototype.resetScenarioConfig = function () {
        this.scenarioConfig = {
            metaAgentsConfigs: [],
            networkSize: 0,
            periods: 0,
            seedSize: 0,
            environmentType: undefined
        };
        return this.scenarioConfig;
    };
    EnvironmentAPI.prototype.getState = function () {
        var excludedProps = ["agents", "seeds"];
        var outputState = [];
        this.environmentFactories.forEach(function (type) {
            var expectedObject = Reflect.construct(type, []);
            console.log("Name: ", type.name);
            outputState.push({
                type: type.name,
                properties: (0, StructureHandler_1.getTypesOfObject)(expectedObject, excludedProps)
            });
        });
        return outputState;
    };
    return EnvironmentAPI;
}());
exports["default"] = EnvironmentAPI;
