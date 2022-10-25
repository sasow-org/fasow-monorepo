import DataHandler from "../datahandler/IDataHandler";
import TowerHandler from "../tower/TowerHandler";
import GenericExperiment from "./GenericExperiment";
import IExperimentStrategy from "./IExperimentStrategy";
import MetaExperimentConfig from "./MetaExperimentConfig";

interface IConfigExperimentAPI {
  id: number;
  name: string;
  description: string;
  maxRepetitions: number;
  detailedData: boolean;
  essentialData: boolean;
}

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
class IExperimentAPI {
  private strategies: Map<IExperimentStrategy, IExperimentStrategy>;

  private experiments: IExperimentStrategy[];
  private strategy?: IExperimentStrategy;
  private experimentConfig: IConfigExperimentAPI = {
    id: 0,
    name: "",
    description: "",
    maxRepetitions: -1,
    detailedData: false,
    essentialData: false,
  };

  constructor() {
    this.strategies = new Map<IExperimentStrategy, IExperimentStrategy>();
    this.experiments = [];
  }

  /* Strategy Handlers */

  setExperiment(strategy: IExperimentStrategy) {
    this.strategy = strategy;
  }

  addNewExperiment(strategy: IExperimentStrategy) {
    this.experiments.push(strategy);
    this.strategies.set(strategy, strategy);
  }

  /* Strategy Handlers */

  /* Configure Experiment */

  setExperimentName(name: string) {
    this.experimentConfig.name = name;
  }

  setExperimentDescription(description: string) {
    this.experimentConfig.description = description;
  }

  setExperimentMaxRepetitions(maxRepetitions: number) {
    this.experimentConfig.maxRepetitions = maxRepetitions;
  }

  setDetailedData(state: boolean) {
    this.experimentConfig.detailedData = state;
  }

  setEssentialData(state: boolean) {
    this.experimentConfig.essentialData = state;
  }

  /* Configure Experiment */

  // todo : method to search in experiments array and set the strategy

  run() {
    console.log("Strategy", this.strategy);
    if (this.strategy) {
      this.strategy.executeStrategy();
      const expConfig: MetaExperimentConfig = {
        id: this.experimentConfig.id,
        name: this.experimentConfig.name,
        type: GenericExperiment,
        description: this.experimentConfig.description,
        essentialData: this.experimentConfig.essentialData,
        detailedData: this.experimentConfig.detailedData,
        maxRepetitions: this.experimentConfig.maxRepetitions,
        scenarioConfig: TowerHandler.getScenarioConfig(),
      };
      const experiment: GenericExperiment = new GenericExperiment(expConfig);
      DataHandler.experiment = experiment;
      experiment.run();
      DataHandler.writeCSVFile();
    }
  }

  getExperimentConfig(): MetaExperimentConfig {
    return {
      id: this.experimentConfig.id,
      name: this.experimentConfig.name,
      type: GenericExperiment,
      description: this.experimentConfig.description,
      essentialData: this.experimentConfig.essentialData,
      detailedData: this.experimentConfig.detailedData,
      maxRepetitions: this.experimentConfig.maxRepetitions,
      scenarioConfig: TowerHandler.getScenarioConfig(),
    };
  }
}

const ExperimentAPI: IExperimentAPI = new IExperimentAPI();
export default ExperimentAPI;
