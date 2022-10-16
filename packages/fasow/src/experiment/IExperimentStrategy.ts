import Experiment from "./Experiment";

export default interface IExperimentStrategy {
  doStrategy(): Experiment;
}
