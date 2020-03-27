import produce from "immer";

type ActionType = {
  type: string;
  payload: Array<any>;
  error: string;
};

// defining what we expect back from some api
interface ApiStructure {
  id: number;
}

// the structure of some global state
export type AppStateType = {
  loading: boolean;
  data: Array<ApiStructure>;
  error: string;
};
export const initialState = { loading: false, data: [], error: "" };

// sample reducer that can be used with the useReducer hook or redux
export const appStateReducer = (
  state: AppStateType,
  action: ActionType
): AppStateType => {
  return produce(state, draftState => {
    switch (action.type) {
      case "APIDATA":
        draftState.data = action.payload;
        draftState.error = "";
        draftState.loading = true;

      case "CLEAR":
        draftState.data = [];
      case "ERROR":
        draftState.error = action.error;
    }
  });
};
