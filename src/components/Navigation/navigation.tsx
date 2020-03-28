import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { ErrorStructure, errorObs } from 'services/errorService';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { HeaderContext } from 'containers/AppContainer';
import './navigation.css';

// will not compile if passing a field not in this definition
type NavigationProps = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textAlign: 'center'
    }
  })
);

export const Navigation = (props: NavigationProps) => {
  // calling setErrors is like calling this.setState
  const [errors, setErrors] = useState<Array<ErrorStructure>>([]);
  const classes = useStyles();
  //consume context
  const { currentPage } = useContext(HeaderContext);

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
          <Typography variant="body1" className={classes.title}>
            {currentPage}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
