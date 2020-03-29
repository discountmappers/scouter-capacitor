import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Fab, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MapIcon from '@material-ui/icons/Map';
import { AppContext } from 'containers/AppContainer';
import './navigation.css';
import { SearchView } from 'utils/general';
import EventNoteIcon from '@material-ui/icons/EventNote';
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
  const classes = useStyles();
  const { currentPage, searchView, setSearchView } = useContext(AppContext);

  const getSearchIcon = () => {
    return searchView === SearchView.MAP ? <EventNoteIcon /> : <MapIcon />;
  };

  // bring different view in
  const switchView = () => {
    if (searchView === SearchView.MAP) {
      setSearchView(SearchView.LIST);
    } else {
      setSearchView(SearchView.MAP);
    }
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar className="mainNavigation">
          <Typography variant="body1" className={classes.title}>
            {currentPage}
          </Typography>
          {searchView !== null ? (
            <Button onClick={switchView}>{getSearchIcon()}</Button>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
