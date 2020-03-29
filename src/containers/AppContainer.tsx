import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Navigation } from 'components/Navigation/navigation';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  createMuiTheme
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  Explore,
  Search,
  AddCircleOutline,
  SupervisorAccountOutlined
} from '@material-ui/icons';
import { SearchView } from 'utils/general';
import { Plugins, DeviceInfo } from '@capacitor/core';
import { useHistory } from "react-router-dom";

type AppProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles({
  appContainer: {
    paddingBottom: 65
  },
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    margin: 0,
    background: '#fafafa',
    color: 'white',
    height: 65,
    alignContent: 'center',
    display: 'flex',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
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
export type AppContextTypes = {
  searchView: SearchView | null;
  setSearchView: (value: SearchView) => void;
  currentPage: string | null;
  device: DeviceInfo | null;
};

// create context
export const AppContext = React.createContext<AppContextTypes>({
  setSearchView: () => { },
  searchView: null,
  currentPage: null,
  device: null
});

const AppContainer = (props: AppProps) => {
  const history = useHistory()
  const classes = useStyles();
  const [navValue, setNavValue] = useState<string | null>(null);
  const [searchView, setSearchView] = useState<SearchView | null>(null);
  const [device, setDevice] = React.useState<DeviceInfo>(null);
  React.useEffect(() => {
    // show filter page if navigating away from it 
    history.listen((val) => {
      setSearchView(null)
    })
    async function getDeviceInfo() {
      const deviceInfo = await Plugins.Device.getInfo();
      setDevice(deviceInfo);
    }

    getDeviceInfo();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setNavValue(newValue);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            setSearchView,
            searchView,
            currentPage: navValue,
            device: device
          }}
        >
          <Container
            maxWidth="xl"
            disableGutters
            className={classes.appContainer}
          >
            <Navigation />
            {props.children}
          </Container>
          <BottomNavigation
            value={navValue}
            onChange={handleChange}
            showLabels
            className={classes.bottomNav}
          >
            <BottomNavigationAction
              component={RouterLink}
              to="/home"
              label="Explore"
              value={'Explore'}
              icon={<Explore />}
            />
            <BottomNavigationAction
              component={RouterLink}
              to="/search"
              label="Search"
              value={'Search'}
              icon={<Search />}
            />
            <BottomNavigationAction
              label="Add Deal"
              value={'Add Deal'}
              icon={<AddCircleOutline />}
            />
            <BottomNavigationAction
              label="Profile"
              value={'Profile'}
              icon={<SupervisorAccountOutlined />}
            />
          </BottomNavigation>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default AppContainer;
