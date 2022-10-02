import Agent from "./agent/Agent";
import MatrixData from "./data/MatrixData";
import RowData from "./data/RowData";
import Environment from "./environment/Environment";
import Experiment from "./experiment/Experiment";
import { IObserver } from "./interfaces";
import Simulation from "./simulation/Simulation";

export interface DataHandlerConfig {
  hasEssentialData: boolean;
  hasDetailedData: boolean;
}

export class DataHandler implements IObserver {
  private static instance: DataHandler | null;

  environment: Environment;
  simulation: Simulation;
  experiment: Experiment;

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

    const rdSimulation: RowData = this.simulation.DataEssential();
    const rdEnvironment: RowData = this.environment.DataEssential();

    const detailedDataRef = this.detailedData;

    // For each agent, add essential data
    this.environment.agents.map((agent: Agent) => {
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
    const rdSimulation: RowData = this.simulation.DataEssential();
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

  public static getInstance(): DataHandler {
    if (!DataHandler.instance) {
      // Instance data with default config
      DataHandler.instance = new DataHandler({
        hasDetailedData: false,
        hasEssentialData: true,
      });
    }
    return DataHandler.instance;
  }

  public static clearInstance(): void {
    this.instance = null;
  }
}
