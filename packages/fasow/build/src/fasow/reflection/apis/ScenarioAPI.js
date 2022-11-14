"use strict";
exports.__esModule = true;
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
var ScenarioAPI = /** @class */ (function () {
    function ScenarioAPI() {
        // Setting up the environment Factories
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
    ScenarioAPI.prototype.registerNewEnvironment = function (newEnvironmentType) {
        this.environmentFactories.set(newEnvironmentType, 
        // @ts-ignore
        // eslint-disable-next-line new-cap
        new newEnvironmentType());
    };
    ScenarioAPI.prototype.getEnvironment = function (env) {
        // @ts-ignore
        return this.environmentFactories.get(env);
    };
    ScenarioAPI.prototype.generateEnvironment = function (config) {
        var envi = this.getEnvironment(config.environmentType).createEnvironment(config);
        if (envi) {
            return envi;
        }
        throw new Error("Environment Type ".concat(config.environmentType, " not exist in ScenarioAPI"));
    };
    /*
    Metodos para configurar el scenario?
     */
    ScenarioAPI.prototype.setNetworkToScenario = function (environment) {
        this.scenarioConfig.environmentType = environment;
    };
    ScenarioAPI.prototype.addAgentToScenario = function (agentConfig) {
        this.scenarioConfig.metaAgentsConfigs.push(agentConfig);
    };
    ScenarioAPI.prototype.setNetworkSizeToScenario = function (size) {
        this.scenarioConfig.networkSize = size;
    };
    ScenarioAPI.prototype.setPeriodsToScenario = function (max) {
        this.scenarioConfig.periods = max;
    };
    ScenarioAPI.prototype.setScenarioConfig = function (scenarioConfig) {
        this.scenarioConfig = scenarioConfig;
    };
    ScenarioAPI.prototype.getScenarioConfig = function () {
        return this.scenarioConfig;
    };
    ScenarioAPI.prototype.resetScenarioConfig = function () {
        this.scenarioConfig = {
            metaAgentsConfigs: [],
            networkSize: 0,
            periods: 0,
            seedSize: 0,
            environmentType: undefined
        };
        return this.scenarioConfig;
    };
    return ScenarioAPI;
}());
exports["default"] = ScenarioAPI;
