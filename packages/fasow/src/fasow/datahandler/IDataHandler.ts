import Experiment from "../abm/Experiment";
import {
  AccumAgentKeysArray,
  CountAgentStatesObjectKeysArray,
  CountEnvironmentKeys,
  CountAgentBooleanObjectKeysArray,
  AccumEnvironmentObjectKeys
} from "./decorators/DataHandlerDecorators";
import {TowerHandler} from "../../main";
import Agent from "../abm/Agent";

// Imports to WriteFiles
const fs = require("fs");
const {Parser} = require("json2csv")

export default class IDataHandler {
    experiment: Experiment | any;
    finalOutput : any[] = [];

  private static generateRow(row: object, toAdd: object){
    Reflect.ownKeys(toAdd).forEach( key => {
      Reflect.set(row, key, Reflect.get(toAdd, key))
    })
    return row;
  }
  private static dumpOutput(target: any[]): string {
    try {
      const parser = new Parser();
      const csv = parser.parse(target)
      return csv
    } catch (e){
      console.log(e)
    }
    return ""
  }

    /**
     * TODO: ADD DOC
    */
    update(): void {
      this.writeLine();
    }

    private writeLine() {
      const repetition = TowerHandler.getRepetition();
      const tick = TowerHandler.getTick();
      const finalRow = {repetition, tick};

      // Environment Row Data
      const environmentCountsRow = this.calculateEnvironmentCounts();
      const environmentAccumRow = this.calculateEnvironmentAccum();

      // Agents Row Data
      const agentAccumRow = this.calculateAgentAccum()
      const agentBooleanCountsRow = this.calculateAgentBooleanCounts();
      const agentStatesRow = this.calculateAgentStateIntegerCounts();

      IDataHandler.generateRow(finalRow, environmentCountsRow)
      IDataHandler.generateRow(finalRow, environmentAccumRow)
      IDataHandler.generateRow(finalRow, agentAccumRow)
      IDataHandler.generateRow(finalRow, agentBooleanCountsRow)
      IDataHandler.generateRow(finalRow, agentStatesRow)


      this.finalOutput.push(finalRow);
    }
    private calculateEnvironmentAccum() : any {
      const envi = this.experiment.simulation.environment
      const row = {}
      AccumEnvironmentObjectKeys.forEach(item => {
        let oldValue = 0;
        if(TowerHandler.getTick()>0){
          const toOut = this.finalOutput[this.finalOutput.length-1];
          oldValue = Reflect.get(toOut, item.propertyKey)
        }
        const actualValue = Reflect.get(envi, item.propertyKey)
        const totalValue = oldValue + actualValue;
        Reflect.set(row, item.propertyKey, totalValue);
      })
      return row;
    }
    private calculateEnvironmentCounts() : any {
      const envi = this.experiment.simulation.environment
      const row = {};
      CountEnvironmentKeys.forEach( item => {
        const key = item.propertyKey;
        const value = Reflect.get(envi, key)
        Reflect.set(row, item.column_name, value)
      })
      return row;
    }
    private calculateAgentStateIntegerCounts() : any {
      const row = {}
      CountAgentStatesObjectKeysArray.forEach(item => {
        let countVar = 0;
        (<Experiment>this.experiment).simulation.environment.agents.forEach( (agent: Agent) => {
          if(agent.state === item.value){
            countVar+=1;
          }
        })
        Reflect.set(row, item.column_name, countVar)
      })
      return row;
    }
    private calculateAgentBooleanCounts() : any {
      const {agents} = this.experiment.simulation.environment;
      const row = {}
      CountAgentBooleanObjectKeysArray.forEach(item => {
        let counter = 0;
        agents.forEach( (agent: object) => {
          const valueFromAgent : boolean = Reflect.get(agent, item.propertyKey)
          if(item.countFalse){ // Si vamos a contar por cada agente que tenga esa property en false
              if(!valueFromAgent){
                counter += 1;
              }
          }else if(valueFromAgent){
              counter +=1
            }
        })
        Reflect.set(row, item.column_name, counter)
      })
      return row;
    }
    private calculateAgentAccum() {
    const {agents} = this.experiment.simulation.environment;
    const row = {}
    AccumAgentKeysArray.forEach(item => {
      let sum = 0;
      agents.forEach((agent: object) => {
        if(Reflect.has(agent,item.propertyKey)){
          sum += Reflect.get(agent, item.propertyKey);
        }
      })
      Reflect.set(row, item.propertyKey, sum);
    })
    return row;
  }

    /**
     * Exports a file with the desired data from finalOutput
     */
    private writeFileData() {
      console.log("Writing File", this.finalOutput);
      fs.writeFileSync(`${this.experiment.name}_output.csv`, IDataHandler.dumpOutput(this.finalOutput))
    }

    public writeCSVFile(): void {
        this.writeFileData();
    }

    // todo: make a method to show te output per period
    public getLastOutputRow() : any {
      return this.finalOutput[this.finalOutput.length-1]
    }
}
