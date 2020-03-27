import React, { useContext, Dispatch } from "react";
import "App.css";

import Child from "Child";
import { Navigation } from "components/Navigation/navigation";
import { useInsightsApi } from "hooks/apiServiceHook";
import { connect } from "react-redux";
import { ContextVal, AppContext } from "contexts/appContext";

type AppProps = {
  dispatch:Dispatch<any>,
  loginUser:object
}
const App = (props: AppProps) => {
   const { state, dispatch } = useContext<ContextVal>(AppContext);

  const { isLoading, fetchAll } = useInsightsApi();

  //if we wanted to fetch data on component load, we would use the useEffect hook
  const getUser = async (event: any, search: string) => {
    const arr = [
      {
        url: "https://thereportoftheweek-api.herokuapp.com/reports",
        method: "GET",
        headers: {},
        body: {}
      },
      {
        url: "tps://thereportoftheweek-api.herokuapp.com/reports",
        method: "GET",
        headers: {},
        body: {}
      }
    ];
    // this example is using the context API & useReducer hook to update state for the child
    const responses = await fetchAll(arr);
    console.log(responses)
    // this dispatch is from the useReducer hook but can easily be from redux
    props.dispatch({type:'LOGIN_SUCCESS', payload:responses[0].data})
  };
  return (
    <div className="App">
      <Navigation getUser={getUser} isLoading={isLoading}></Navigation>
      <Child />
    </div>
  );
};

// give componnent access to dispatch actions
const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const mapStateToProps = (state: any, ownprops: any) => {
  return {
    loginUser: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
