interface ExperimentConfig {
  name: string;
  description: string;
  repetitions: number;
  maxRepetitions: number;
  type: string;

  // TODO: set correct data handler and simulation type
  dataHandlerConfig: any;
  simulationConfig: any;

  agentQuantities: {
    [agentId: number]: number;
  };
}

export default abstract class Experiment implements ExperimentConfig {
  name;
  description;
  repetitions;
  maxRepetitions;
  type;
  dataHandlerConfig;
  simulationConfig;
  agentQuantities = {};

  constructor(config: ExperimentConfig) {
    this.name = config.name;
    this.description = config.description;
    this.repetitions = config.repetitions;
    this.maxRepetitions = config.maxRepetitions;
    this.type = config.type;
    this.dataHandlerConfig = config.dataHandlerConfig;
    this.simulationConfig = config.simulationConfig;
  }

  run() {}

  initialize() {}

  configure() {}
}
