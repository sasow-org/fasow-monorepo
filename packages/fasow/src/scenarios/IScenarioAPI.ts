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
import type Environment from "../environment/Environment";
import type IEnvironmentCreator from "../environment/IEnvironmentCreator";
import MetaExperimentConfig from "../experiment/MetaExperimentConfig";

class IScenarioAPI {
  private environmentFactories: Map<string, IEnvironmentCreator>;

  constructor() {
    this.environmentFactories = new Map<string, IEnvironmentCreator>();
  }

  registerNewEnvironment(newEnvironmentType: typeof Environment) {
    this.environmentFactories.set(
      newEnvironmentType.name,
      // @ts-ignore
      // eslint-disable-next-line new-cap
      new newEnvironmentType()
    );
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
}

const ScenarioAPI: IScenarioAPI = new IScenarioAPI();
export default ScenarioAPI;
