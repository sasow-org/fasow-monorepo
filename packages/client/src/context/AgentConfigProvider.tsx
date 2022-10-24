// import { createContext, useContext, useReducer } from "react";
import { initialAgentConfigState } from "./ExperimentConfigData";
import { AgentReducer } from "./reducer/AgentReducer";

const AgentConfigContext = createContext(undefined);

export const useAgentConfigContext = () => useContext(AgentConfigContext);

function AgentConfigProvider({ children }) {
  const [state, dispatch] = useReducer(AgentReducer, initialAgentConfigState);

  return (
    <AgentConfigContext.Provider
      value={{ agentConfig: state, agentDispatch: dispatch }}
    >
      {children}
    </AgentConfigContext.Provider>
  );
}

export default AgentConfigProvider;
