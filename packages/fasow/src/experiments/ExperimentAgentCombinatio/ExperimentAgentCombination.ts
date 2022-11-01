import Experiment from "../../fasow/abm/Experiment";

export default class ExperimentAgentCombination extends Experiment {
  Strategy(): void {
    console.log("Original Strategy");
  }

  // eslint-disable-next-line class-methods-use-this
  createExperiment(): Experiment {
    return new ExperimentAgentCombination();
  }
}
