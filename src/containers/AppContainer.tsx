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
import { Explore, Settings, Search, AddCircleOutline, SupervisorAccountOutlined } from '@material-ui/icons';

type AppProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    margin: 0,
    background: '#fafafa',
    color: 'white',
    height: 65,
    alignContent: 'center',
    display: 'flex',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33abb8',
      main: '#0097a7',
      dark: '#006974',
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

//set context types
export type HeaderContextTypes = {
  currentPage: String
}

// create context
export const HeaderContext = React.createContext<HeaderContextTypes>({
  currentPage: 'Explore'
})

const AppContainer = (props: AppProps) => {
  const classes = useStyles();
  const [navValue, setNavValue] = React.useState('Explore');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setNavValue(newValue);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <HeaderContext.Provider
            value={{currentPage: navValue}}
        >
          <Container maxWidth="xl" disableGutters>
            <Navigation />
            {props.children}
          </Container>
          <BottomNavigation
            value={navValue}
            onChange={handleChange}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction
              component={RouterLink}
              to="/home"
              label="Explore"
              value={"Explore"}
              icon={<Explore />}
            />
            <BottomNavigationAction
              component={RouterLink}
              to="/search"
              label="Search"
              value={"Search"}
              icon={<Search />}
            />
            <BottomNavigationAction label="Add Deal" value={"Add Deal"} icon={<AddCircleOutline />} />
            <BottomNavigationAction label="Profile"  value={"Profile"} icon={<SupervisorAccountOutlined />} />
          </BottomNavigation>
        </HeaderContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default AppContainer;
