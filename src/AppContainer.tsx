import React, { useReducer } from "react";
import { appStateReducer, initialState } from "reducers/appStateReducer";
import { connect } from "react-redux";
import { AppContext } from "contexts/appContext";

type AppProps = {
  children: React.ReactNode;
  loginUser: any;
};

const AppContainer = (props: AppProps) => {
  // creates a redux-like pattern
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  // allows all child components access to the context, potentially some logged in user
  // this adds the user from redux onto the context
  const contextValue = { state, dispatch, user: props.loginUser };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

// hook redux in
const mapStateToProps = (state: any, ownprops: any) => {
  return {
    loginUser: state.user
  };
};
export default connect(mapStateToProps)(AppContainer);
