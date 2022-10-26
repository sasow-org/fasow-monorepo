import Experiment from "./Experiment";

export default interface IExperimentCreator {
  createExperiment(): Experiment;
}
