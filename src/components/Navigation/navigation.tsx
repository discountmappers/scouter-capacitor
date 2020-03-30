import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Fab,
  Button,
  ButtonBase
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MapIcon from "@material-ui/icons/Map";
import { AppContext } from "containers/AppContainer";
import "./navigation.css";
import { SearchView } from "utils/general";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { backObs, handle } from "services/backService";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useLocation } from "react-router-dom";
// will not compile if passing a field not in this definition
type NavigationProps = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    searchViewTitle: {
      flexGrow: 1,
      fontWeight: "bold",
      textAlign: "center",
      paddingRight: "52px"
    },
    backTitle: {
      flexGrow: 1,
      fontWeight: "bold",
      textAlign: "center",
      paddingRight: "76px"
    },
    normalTitle: {
      flexGrow: 1,
      fontWeight: "bold",
      textAlign: "center"
    },
    buttonRoot: {
      color: "white",
      display: "flex",
      flexDirection: "column"
    },
    buttonBase: {
      display: "flex",
      flexDirection: "column"
    },
    mainNavigation: {
      height: 75
    }
  })
);

export const Navigation = (props: NavigationProps) => {
  const classes = useStyles();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const { currentPage, searchView, setSearchView } = useContext(AppContext);

  useEffect(() => {
    const back = backObs.subscribe((val: any) => {
      setShow(val);
    });
    return () => {
      back.unsubscribe();
    };
  });

  const getSearchIcon = () => {
    return searchView === SearchView.MAP ? (
      <>
        <EventNoteIcon className="navBtn" /> <div>{SearchView.LIST}</div>
      </>
    ) : (
      <>
        <MapIcon className="navBtn" />
        <div>{SearchView.MAP}</div>
      </>
    );
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
    handle();
  };

  const getSearchToggle = () => {
    return location.pathname === "/search" ? (
      <ButtonBase
        classes={{
          root: classes.buttonBase
        }}
        onClick={switchView}
      >
        {getSearchIcon()}
      </ButtonBase>
    ) : (
      ""
    );
  };

  //due to weirdness with back and map icon, center the title correctly
  let headerTextClass = "";
  if (show && searchView !== null) {
    headerTextClass = classes.searchViewTitle;
  } else if (show) {
    headerTextClass = classes.backTitle;
  } else {
    headerTextClass = classes.normalTitle;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.mainNavigation}>
          {show && (
            <Button
              classes={{
                root: classes.buttonRoot
              }}
              onClick={goBack}
            >
              <ArrowBackIcon className="navBtn" />
              Back
            </Button>
          )}
          <Typography variant="body1" className={headerTextClass}>
            {currentPage}
          </Typography>
          {searchView !== null ? getSearchToggle() : ""}
        </Toolbar>
      </AppBar>
    </>
  );
};
