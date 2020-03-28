import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Navigation } from 'components/Navigation/navigation';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  createMuiTheme
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Explore, LocationOn, Settings, PlaylistAdd } from '@material-ui/icons';

type AppProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    margin: 0,
    background: '#cfd8dc',
    color: 'white',
    height: 55,
    alignContent: 'center'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d0d4ed',
      main: '#3949ab',
      dark: '#121858',
      contrastText: '#fff'
    },
    secondary: {
      light: '#cfd8dc',
      main: '#b0bec5',
      dark: '#90a4ae',
      contrastText: '#000'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
});

const AppContainer = (props: AppProps) => {
  const classes = useStyles();
  const [navValue, setNavValue] = React.useState({
    navValue: null
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" disableGutters>
          <Navigation />
          {props.children}
        </Container>
        <BottomNavigation
          value={navValue}
          onChange={(event, newNavValue) => {
            setNavValue(newNavValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={RouterLink}
            to="/home"
            label="Explore"
            icon={<Explore />}
          />
          <BottomNavigationAction
            component={RouterLink}
            to="/discounts"
            label="Map"
            icon={<LocationOn />}
          />
          <BottomNavigationAction label="Add Deal" icon={<PlaylistAdd />} />
          <BottomNavigationAction label="Settings" icon={<Settings />} />
        </BottomNavigation>
      </ThemeProvider>
    </>
  );
};

export default AppContainer;
