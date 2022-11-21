import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { AgentReducer } from "./reducers/AgentReducer";

const AgentConfigContext = createContext({});

export const useAgentConfigContext = () => useContext(AgentConfigContext);

function AgentConfigProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AgentReducer, {});

  const value = useMemo(
    () => ({ agentConfig: state, agentDispatch: dispatch }),
    [state]
  );

  return (
    <AgentConfigContext.Provider value={value}>
      {children}
    </AgentConfigContext.Provider>
  );
}

export default AgentConfigProvider;
