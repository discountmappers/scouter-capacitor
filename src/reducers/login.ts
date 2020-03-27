import { LOGIN_SUCCESS } from "actions/searchAction";
import produce from "immer";
type LoginState = {
  user: Array<any>;
};
type Action = {
  type: String;
  payload: any;
};

/**
 * Reducer to update login state. Uses immer to clean up reducers
 */

export const loginReducer = (
  state: LoginState = { user: [] },
  action: Action
) => {
  return produce(state, draftState => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draftState.user = action.payload;
        break;
    }
  });
};
