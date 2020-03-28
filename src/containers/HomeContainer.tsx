import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  createMuiTheme
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Explore, LocationOn, Settings, PlaylistAdd } from '@material-ui/icons';
import { DiscountTypes } from '../components/DiscountTypes';
import { TextSearch } from '../components/TextSearch';

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

export const HomeContainer = (props: any) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <ThemeProvider theme={theme}>
      <TextSearch />
      <DiscountTypes />
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Explore" icon={<Explore />} />
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
  );
};
