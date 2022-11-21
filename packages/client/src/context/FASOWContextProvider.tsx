import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { fasowInstance } from "@fasow/backend/build";

import FASOWReducer from "./reducers/FASOWReducer";

const stateFasow = fasowInstance.getState().state;
const FASOWContext = createContext(stateFasow);

export const useFASOWContext = () => useContext(FASOWContext);

function FASOWContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(FASOWReducer, stateFasow);

  const value = useMemo(
    () => ({ fasowData: state, fasowDispatch: dispatch }),
    [state]
  );

  return (
    <FASOWContext.Provider value={value}>{children}</FASOWContext.Provider>
  );
}

export default FASOWContextProvider;
