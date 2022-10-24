import IExperimentStrategy from "./IExperimentStrategy";

/*
Es la capa de introduccion que permite usar un
lenguaje familiar para personas que trabajan en marketing
WOM. Al mismo tiempo ofrece un primer acceso para
implementar un modelo a estudiar. En esta capa se define
el proposito de la simulacion seleccionando a los grupos
de agentes que se necesitan, el ambiente que se desea y
se ingresa la informacion sobre como se espera realizar la
simulaci ́on. Aquı se puede seleccionar una gran variedad de
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
  private experiments: IExperimentStrategy[];
  private strategy?: IExperimentStrategy;

  constructor() {
    this.experiments = [];
  }

  setExperiment(strategy: IExperimentStrategy) {
    this.strategy = strategy;
  }

  addNewExperiment(strategy: IExperimentStrategy) {
    this.experiments.push(strategy);
  }

  // todo : method to search in experiments array and set the strategy

  run() {
    if (this.strategy) {
      this.strategy.doStrategy().run();
    }
  }
}

const ExperimentAPI: IExperimentAPI = new IExperimentAPI();
export default ExperimentAPI;
