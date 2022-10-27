// eslint-disable-next-line import/no-cycle
import Experiment from "../abm/Experiment";
import DataHandlerConfig from "../config/config/DataHandlerConfig";
import MatrixData from "./data/MatrixData";
import RowData from "./data/RowData";
import { IObserver } from "./interfaces";

const fs = require("fs");

export default class IDataHandler implements IObserver, DataHandlerConfig {
  // todo : use Patron strategy and apply to DataHandler --> hardest to apply
  experiment: Experiment | any;

  /*
  UNNECESARY FOR NOW

  envModel: Model<Environment> = new Model<Environment>();
  simuModel: Model<Simulation> = new Model<Simulation>();
  agentModel: Model<Agent> = new Model<Agent>();
  experimentModel: Model<Experiment> = new Model<Experiment>();
  */
  essentialData: MatrixData = new MatrixData();
  detailedData: MatrixData = new MatrixData();
  hasEssentialData: boolean;
  hasDetailedData: boolean;

  constructor(dataHandlerConfig: DataHandlerConfig) {
    this.hasEssentialData = dataHandlerConfig.hasEssentialData;
    this.hasDetailedData = dataHandlerConfig.hasDetailedData;
  }

  /**
   * TODO: ADD DOC
   */
  update(): void {
    if (this.hasEssentialData) {
      this.addLineEssential();
    }
    if (this.hasDetailedData) {
      this.addLineDetailed();
    }
  }

  /**
   * TODO: ADD DOC
   */
  public addLineDetailed(): void {
    if (this.detailedData === null) return;
    // @ts-ignore
    const rdExperiment: RowData = this.experiment.DataEssential();
    // console.log("rdExperimernt: \n", rdExperiment);
    // const rdSimulation: RowData = this.simulation.DataEssential();
    // const rdEnvironment: RowData = this.environment.DataEssential();
    this.detailedData.addRow(rdExperiment);

    /*
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

     */
  }

  public addLineEssential(): void {
    if (this.essentialData === null) return;
    // @ts-ignore
    const rdExperiment: RowData = this.experiment.DataEssential();
    // console.log("rdExperimernt: \n", rdExperiment);
    // console.log("ON ADDLINEESSENTIAL: ");
    // console.log(rdExperiment);
    this.essentialData.addRow(rdExperiment);
    /*
    const rd: RowData = new RowData();
    // @ts-ignore
    const rdSimulation: RowData = this.simulation.DataEssential();
    // @ts-ignore
    const rdEnvironment: RowData = this.environment.DataEssential();

    // Add rows
    rd.addRows(rdSimulation);
    rd.addRows(rdEnvironment);

    this.essentialData.addRow(rd);
    */
  }

  public writeCSVFile(): void {
    if (this.essentialData !== null) {
      this.writeFileData(this.essentialData, "essential");

      // reset data
      this.essentialData = new MatrixData();
    }

    /*
    if (this.detailedData !== null) {
      this.writeFileData(this.detailedData, "detailed");

      // reset data
      this.detailedData = new MatrixData();
    }

     */
  }

  /**
   * Exports a file with the desired data from Matrix Data
   * @param data the data to be exported
   * @param mode the mode of the data. Can be essential or detailed.
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private writeFileData(data: MatrixData, mode: string) {
    // TODO: ? export data
    const final: string = data.toCSVFormat();
    console.log("Final ?");
    fs.writeFileSync(`essentailData_${this.experiment.name}.csv`, final);
    console.log("Writing File", data);
  }
}
