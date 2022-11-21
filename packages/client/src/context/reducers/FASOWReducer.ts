import FASOWReducerTypes from "./types/FASOWReducerTypes";

const FASOWReducer = (state: any, action: any) => {
  switch (action.type) {
    case FASOWReducerTypes.getExperiments: {
      return state.experiments;
    }
    default: {
      return state;
    }
  }
};

export default FASOWReducer;
