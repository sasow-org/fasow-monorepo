import ExampleExperiment from "../../../experiments/ExampleExperiment";
import { DataHandler, TowerHandler } from "../../../main";
import Experiment from "../../abm/Experiment";
import MetaExperimentConfig from "../../config/metaconfig/MetaExperimentConfig";

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
export default class IExperimentAPI {
  private experimentList: Map<string, typeof Experiment>;
  private selectedExperiment: Experiment | any;

  private experimentConfig: IConfigExperimentAPI = {
    id: 0,
    name: "",
    description: "",
    maxRepetitions: -1,
    detailedData: false,
    essentialData: false,
  };

  constructor() {
    this.experimentList = new Map<string, typeof Experiment>();
  }

  /* Strategy Handlers */

  registerNewExperiment(exp: typeof Experiment) {
    // @ts-ignore
    // eslint-disable-next-line new-cap
    this.experimentList.set(exp.name, exp);
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
    TowerHandler.setMaxRepetition(maxRepetitions);
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
    // console.log("Strategy", this.strategy);
    // todo handle with a trycatch if the experiments is undefined
    console.log("Selected Experiment: ", this.selectedExperiment);
    const exp = this.createSelectedExperiment();
    DataHandler.experiment = exp;
    exp.executeStrategy();
    exp.run();
    DataHandler.writeCSVFile();
  }

  getExperimentConfig(): MetaExperimentConfig {
    return {
      id: this.experimentConfig.id,
      name: this.experimentConfig.name,
      type: ExampleExperiment,
      description: this.experimentConfig.description,
      essentialData: this.experimentConfig.essentialData,
      detailedData: this.experimentConfig.detailedData,
      maxRepetitions: TowerHandler.getMaxRepetition(),
      scenarioConfig: TowerHandler.getScenarioConfig(),
    };
  }

  createExperiment(type: typeof Experiment): Experiment {
    // @ts-ignore
    // eslint-disable-next-line new-cap
    return this.experimentList.get(type).createExperiment();
  }

  createSelectedExperiment(): Experiment {
    // eslint-disable-next-line new-cap
    return new this.selectedExperiment();
  }

  selectExperiment(selected: typeof Experiment) {
    this.selectedExperiment = this.experimentList.get(selected.name);
  }
}
