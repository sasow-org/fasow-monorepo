import IExperimentStrategy from "./IExperimentStrategy";

class IExperimentAPI {
  private experiments: IExperimentStrategy[];
  private strategy?: IExperimentStrategy;

  constructor() {
    this.experiments = [];
  }

  setStrategy(strategy: IExperimentStrategy) {
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
