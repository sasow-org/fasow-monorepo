import Agent from "../agent/Agent";
import MatrixData from "../data/MatrixData";
import RowData from "../data/RowData";
// eslint-disable-next-line import/no-cycle
import Environment from "../environment/Environment";
// eslint-disable-next-line import/no-cycle
import Experiment from "../experiment/Experiment";
import { IObserver } from "../interfaces";
// eslint-disable-next-line import/no-cycle
import Simulation from "../simulation/Simulation";
import DataHandlerConfig from "./DataHandlerConfig";
// eslint-disable-next-line import/namespace
import { Model } from "./types/types";

class IDataHandler implements IObserver {
  // todo : use Patron strategy and apply to DataHandler
  environment?: Environment;
  simulation?: Simulation;
  experiment?: Experiment;

  envModel: Model<Environment> = new Model<Environment>();
  simuModel: Model<Simulation> = new Model<Simulation>();
  agentModel: Model<Agent> = new Model<Agent>();
  experimentModel: Model<Experiment> = new Model<Experiment>();

  essentialData: MatrixData | null = null;
  detailedData: MatrixData | null = null;

  constructor(dataHandlerConfig: DataHandlerConfig) {
    const { hasDetailedData, hasEssentialData } = dataHandlerConfig;

    if (hasEssentialData) {
      this.essentialData = new MatrixData();
    }

    if (hasDetailedData) {
      this.detailedData = new MatrixData();
    }
  }

  /**
   * TODO: ADD DOC
   */
  update(): void {
    if (this.essentialData !== null) {
      this.addLineEssential();
    }
    if (this.detailedData !== null) {
      this.addLineDetailed();
    }
  }

  /**
   * TODO: ADD DOC
   */
  public addLineDetailed(): void {
    if (this.detailedData === null) return;

    // @ts-ignore
    const rdSimulation: RowData = this.simulation.DataEssential();
    // @ts-ignore
    const rdEnvironment: RowData = this.environment.DataEssential();

    const detailedDataRef = this.detailedData;

    // For each agent, add essential data
    // @ts-ignore
    this.environment.agents.forEach((agent: Agent) => {
      const rd: RowData = new RowData();

      // Add rows
      rd.addRows(rdSimulation);
      rd.addRows(rdEnvironment);
      rd.addRows(agent.DataDetailed());

      detailedDataRef.addRow(rd);
    });
  }

  public addLineEssential(): void {
    if (this.essentialData === null) return;

    const rd: RowData = new RowData();
    // @ts-ignore
    const rdSimulation: RowData = this.simulation.DataEssential();
    // @ts-ignore
    const rdEnvironment: RowData = this.environment.DataEssential();

    // Add rows
    rd.addRows(rdSimulation);
    rd.addRows(rdEnvironment);

    this.essentialData.addRow(rd);
  }

  public writeCSVFile(): void {
    if (this.essentialData !== null) {
      this.writeFileData(this.essentialData, "essential");

      // reset data
      this.essentialData = new MatrixData();
    }

    if (this.detailedData !== null) {
      this.writeFileData(this.detailedData, "detailed");

      // reset data
      this.detailedData = new MatrixData();
    }
  }

  /**
   * Exports a file with the desired data from Matrix Data
   * @param data the data to be exported
   * @param mode the mode of the data. Can be essential or detailed.
   */
  private writeFileData(data: MatrixData, mode: string): void {
    // TODO: Actually export data
  }
}

const DataHandler: IDataHandler = new IDataHandler({
  hasDetailedData: false,
  hasEssentialData: true,
});

export default DataHandler;
