import React, { useContext, useMemo, useState, useEffect } from "react";
import { AppBar, Toolbar, Button, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ErrorStructure, errorObs } from "services/errorService";
import AutoComplete from "./autoComplete";
import "./navigation.css";
import { ContextVal, AppContext } from "contexts/appContext";

// will not compile if passing a field not in this definition 
type NavigationProps = {
  getUser: (event: any, search: string) => void;
  isLoading: boolean;
};
const autoCompleteUrl = "https://api.tvmaze.com/schedule/full";
export const Navigation = (props: NavigationProps) => {
  const { state, dispatch } = useContext<ContextVal>(AppContext);

  // calling setErrors is like calling this.setState
  const [errors, setErrors] = useState<Array<ErrorStructure>>([]);

  useEffect(() => {
    // errors from anywhere in the app could be handled here
    const err$ = errorObs.subscribe((err: any) => {
      setErrors(err);
    });
    return () => {
      // called when component unmounts
      err$.unsubscribe();
    };
  });

  // only re-render if there is any error or we start/stop loading
  return useMemo(() => {
    return (
      <>
        <AppBar position="static">
          <Toolbar className="mainNavigation">
            <div className="navigationActions">
              <Button
                onClick={e => props.getUser(e, "samplesearch")}
                variant="contained"
                color="default"
              >
                Fetch some data
              </Button>
              <AutoComplete endpoint={autoCompleteUrl} />
            </div>
          </Toolbar>
        </AppBar>
        <div>{props.isLoading ? <LinearProgress variant="query" /> : null}</div>
        <div>
          {errors.length > 0 ? (
            <Alert severity="error">Error: {errors[0].message}</Alert>
          ) : null}
        </div>
      </>
    );
  }, [props.isLoading, errors]);
};
