import React, { useContext, useMemo, useState, useEffect } from "react";
import { AppBar, Toolbar, Button, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ErrorStructure, errorObs } from "services/errorService";
import AutoComplete from "./autoComplete";
import "./navigation.css";

// will not compile if passing a field not in this definition 
type NavigationProps = {

};
export const Navigation = (props: NavigationProps) => {

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
  return (
    <>
      <AppBar position="static">
        <Toolbar className="mainNavigation">

        </Toolbar>
      </AppBar>
    </>
  )
};
