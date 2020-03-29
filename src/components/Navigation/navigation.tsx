import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Fab, Button, ButtonBase } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MapIcon from '@material-ui/icons/Map';
import { AppContext } from 'containers/AppContainer';
import './navigation.css';
import { SearchView } from 'utils/general';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { backObs, handle } from 'services/backService';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// will not compile if passing a field not in this definition
type NavigationProps = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      margin: '10%'
    },

    buttonRoot: {
      color: 'white'
    },
    buttonBase: {
      display: 'flex',
      flexDirection: 'column'
    }
  })
);

export const Navigation = (props: NavigationProps) => {
  const classes = useStyles();
  const [show, setShow] = useState(false)
  const { currentPage, searchView, setSearchView } = useContext(AppContext);

  useEffect(() => {
    const back = backObs.subscribe((val: any) => {
      setShow(val)
    })
    return () => {
      back.unsubscribe()
    }
  })
  const getSearchIcon = () => {
    const icon = []
    return searchView === SearchView.MAP ?
      <><EventNoteIcon className="navBtn" /> <div>{SearchView.LIST}</div></> :
      <><MapIcon className="navBtn" /><div>{SearchView.MAP}</div></>
  };

  // bring different view in
  const switchView = () => {
    if (searchView === SearchView.MAP) {
      setSearchView(SearchView.LIST);
    } else {
      setSearchView(SearchView.MAP);
    }
  };

  // let another component handle the back
  const goBack = () => {
    handle()
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar className="mainNavigation">
          {show && <Button classes={{
            root: classes.buttonRoot
          }} onClick={goBack}><ArrowBackIcon className="navBtn" />Back</Button>}
          <Typography variant="body1" className={classes.title}>
            {currentPage}
          </Typography>
          {searchView !== null ? (
            <ButtonBase classes={{
              root: classes.buttonBase
            }} onClick={switchView}>{getSearchIcon()}</ButtonBase>
          ) : (
              ''
            )}
        </Toolbar>
      </AppBar>
    </>
  );
};
