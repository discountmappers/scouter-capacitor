import { Dispatch } from "react";
import { AppStateType, initialState } from "reducers/appStateReducer";
import React from "react";

// a sample use of the context api.
// it seems like best practice to break context's up if they start to become to bloated
// updating anything in context will re-render any consumers unless using the useMemo hook

export type ContextVal = {
  state: AppStateType;
  // the type when you hover over setState in AppProvider
  dispatch: Dispatch<any>;
  user: any;
};

export const AppContext = React.createContext<ContextVal>({
  state: { ...initialState },
  dispatch: () => null,
  user: []
});
