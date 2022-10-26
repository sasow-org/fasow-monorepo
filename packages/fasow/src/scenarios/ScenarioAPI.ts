import MetaAgentConfig from "../agent/MetaAgentConfig";
import type Environment from "../environment/Environment";
import type IEnvironmentCreator from "../environment/IEnvironmentCreator";
import MetaScenarioConfig from "./MetaScenarioConfig";

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
export default class ScenarioAPI {
  private environmentFactories: Map<typeof Environment, IEnvironmentCreator>;
  private scenarioConfig: any | MetaScenarioConfig;

  constructor() {
    // Setting up the environment Factories
    this.environmentFactories = new Map<
      typeof Environment,
      IEnvironmentCreator
    >();

    // Setting up the scenario config.
    this.scenarioConfig = {
      metaAgentsConfigs: [],
      networkSize: 0,
      periods: 0,
      seedSize: 0,
      environmentType: undefined,
    };
  }

  /*
  Metodos para registrar clases?
   */

  registerNewEnvironment(newEnvironmentType: typeof Environment) {
    this.environmentFactories.set(
      newEnvironmentType,
      // @ts-ignore
      // eslint-disable-next-line new-cap
      new newEnvironmentType()
    );
  }

  private getEnvironment(env: typeof Environment): Environment {
    // @ts-ignore
    return this.environmentFactories.get(env);
  }

  generateEnvironment(config: MetaScenarioConfig): Environment {
    const envi = this.getEnvironment(config.environmentType).createEnvironment(
      config
    );
    if (envi) {
      return envi;
    }
    throw new Error(
      `Environment Type ${config.environmentType} not exist in ScenarioAPI`
    );
  }

  /*
  Metodos para configurar el scenario?
   */

  setNetworkToScenario(environment: typeof Environment) {
    this.scenarioConfig.environmentType = environment;
  }

  addAgentToScenario(agentConfig: MetaAgentConfig) {
    this.scenarioConfig.metaAgentsConfigs.push(agentConfig);
  }

  setNetworkSizeToScenario(size: number) {
    this.scenarioConfig.networkSize = size;
  }

  setPeriodsToScenario(max: number) {
    this.scenarioConfig.periods = max;
  }

  setScenarioConfig(scenarioConfig: MetaScenarioConfig) {
    this.scenarioConfig = scenarioConfig;
  }

  getScenarioConfig(): MetaScenarioConfig {
    return this.scenarioConfig;
  }

  resetScenarioConfig(): MetaScenarioConfig {
    this.scenarioConfig = {
      metaAgentsConfigs: [],
      networkSize: 0,
      periods: 0,
      seedSize: 0,
      environmentType: undefined,
    };
    return this.scenarioConfig;
  }
}
