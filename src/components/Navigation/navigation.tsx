import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Fab, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { HeaderContext } from 'containers/AppContainer';
import MapIcon from '@material-ui/icons/Map';
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
  const classes = useStyles();
  //consume context
  const { currentPage, searchView } = useContext(HeaderContext);

  // only re-render if there is any error or we start/stop loading
  return (
    <>
      <AppBar position="static">
        <Toolbar className="mainNavigation">
          <Typography variant="body1" className={classes.title}>
            {currentPage}
          </Typography>
          <Button><MapIcon /><br /><div>{searchView || 'Temp'}</div></Button>
        </Toolbar>
    </AppBar>
    </>
  );
};
