import { AgentReducerTypes } from "./types/AgentReducerTypes";

/* eslint-disable import/prefer-default-export */
export const AgentReducer = (state: any, action: any) => {
  switch (action.type) {
    case AgentReducerTypes.setId: {
      return {
        ...state,
        id: action.value,
      };
    }
    case AgentReducerTypes.restartConfig: {
      // TODO: Set correct
      return {};
    }
    case AgentReducerTypes.setAgentPercentage: {
      return {
        ...state,
        agentPercentage: action.value,
      };
    }
    case AgentReducerTypes.setAgentType: {
      return {
        ...state,
        agentType: action.value,
      };
    }
    case AgentReducerTypes.setSeed: {
      return {
        ...state,
        isSeed: action.value,
      };
    }
    case AgentReducerTypes.setConfigName: {
      return {
        ...state,
        configName: action.value,
      };
    }
    case AgentReducerTypes.setPercentageFollowers: {
      return {
        ...state,
        percentageFollowers: action.value,
      };
    }
    case AgentReducerTypes.setPercentageFollowings: {
      return {
        ...state,
        percentageFollowings: action.value,
      };
    }
    case AgentReducerTypes.setInitialState: {
      return {
        ...state,
        initialState: action.value,
      };
    }
    case AgentReducerTypes.addAction: {
      return {
        ...state,
        actions: [...state.actions, action.payload],
      };
    }
    case AgentReducerTypes.deleteAction: {
      return {
        ...state,
        actions: state.actions.filter(
          (config: any) => config.id !== action.value
        ),
      };
    }
    case AgentReducerTypes.updateAction: {
      return {
        // todo check if works
        ...state,
        actions: state.actions.map((config: any, i: number) =>
          i === action.value ? action.payload : config
        ),
      };
    }
    case AgentReducerTypes.setActions: {
      return {
        ...state,
        actions: action.payload,
      };
    }
    case AgentReducerTypes.updateActionProbability: {
      return {
        ...state,
        actions: state.actions.map((config: any) =>
          config.id === action.index
            ? { ...config, actionProbability: action.value }
            : config
        ),
      };
    }
    case AgentReducerTypes.loadConfig: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
