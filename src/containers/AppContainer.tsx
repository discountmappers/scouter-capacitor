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
import { theme } from '../themes/theme';

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

//set context types
export type AppContextTypes = {
  searchView: SearchView | null;
  setSearchView: (value: SearchView) => void;
  currentPage: string | null;
  device: DeviceInfo | null;
};

// create context
export const AppContext = React.createContext<AppContextTypes>({
  setSearchView: () => {},
  searchView: SearchView.LIST,
  currentPage: null,
  device: null
});

const AppContainer = (props: AppProps) => {
  const classes = useStyles();
  const [navValue, setNavValue] = useState<string | null>(null);
  const [searchView, setSearchView] = useState<SearchView | null>(null);
  const [device, setDevice] = React.useState<DeviceInfo>(null);
  React.useEffect(() => {
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
              component={RouterLink}
              to="/deals"
              label="Add Deal"
              value={'Add Deal'}
              icon={<AddCircleOutline />}
            />
            <BottomNavigationAction
              component={RouterLink}
              to="/profile"
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
