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
import Environment from "../environment/Environment";
import EnvironmentCreator from "../environment/factory/EnvironmentCreator";
import MetaExperimentConfig from "../experiment/MetaExperimentConfig";

export default class ScenarioAPI {
  private static instance: ScenarioAPI;

  private environmentFactories: Map<string, EnvironmentCreator>;

  constructor() {
    this.environmentFactories = new Map<string, EnvironmentCreator>();
  }

  registerEnvironmentFactory(newFactory: EnvironmentCreator, type: string) {
    this.environmentFactories.set(type, newFactory);
  }

  generateEnvironment(config: MetaExperimentConfig): Environment {
    const envi = this.environmentFactories
      .get(config.environmentType)
      ?.createEnvironment(config);
    if (envi) {
      return envi;
    }
    throw new Error(
      `Environment Type ${config.environmentType} not exist in ScenarioAPI`
    );
  }

  static getInstance(): ScenarioAPI {
    if (this.instance === undefined) {
      this.instance = new ScenarioAPI();
    }
    return this.instance;
  }
}
