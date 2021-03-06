import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Navigation } from "components/Navigation/navigation";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import {
  Explore,
  Search,
  AddCircleOutline,
  SupervisorAccountOutlined
} from "@material-ui/icons";
import { SearchView, Position, Deal, isEmpty, Pages } from "utils/general";
import { Plugins, DeviceInfo } from "@capacitor/core";
import { useHistory } from "react-router-dom";
import { theme } from "../themes/theme";
import { useGeoPosition } from "../hooks/useGeoPosition";

type AppProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles({
  appContainer: {
    paddingBottom: 90,
    background: "#f5f5f5"
  },
  bottomNav: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    margin: 0,
    background: "#fafafa",
    color: "white",
    height: 65,
    alignContent: "center",
    display: "flex",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    paddingBottom: "15px"
  }
});

//set context types
export type AppContextTypes = {
  searchView: SearchView | null;
  setSearchView: (value: SearchView) => void;
  currentPage: string | null;
  device: DeviceInfo | null;
  devicePosition: Position | null;
  filterResults: Array<Deal>;
  setFilterResults: (value: Array<Deal>) => void;
  deviceLocationName: string;
  refetchDeals: () => void;
};

// create context
export const AppContext = React.createContext<AppContextTypes>({
  setSearchView: () => {},
  searchView: null,
  currentPage: null,
  device: null,
  devicePosition: null,
  filterResults: [],
  setFilterResults: () => {},
  deviceLocationName: null,
  refetchDeals: () => {}
});

const checkNavigation = ({
  navValue,
  setNavValue,
  history
}: {
  navValue: string;
  setNavValue: (value: string) => void;
  history: any;
}) => {
  if (isEmpty(navValue)) {
    const rootRoute = history.location.pathname.split("/")[1];
    const childRoute = history.location.pathname.split("/")[2];

    switch (rootRoute) {
      case "":
        setNavValue(Pages.EXPLORE);
        break;
      case "search":
        setNavValue(Pages.SEARCH);
        break;
      case "deals":
        childRoute ? setNavValue(Pages.SEARCH) : setNavValue(Pages.ADD_DEAL);
        break;
      case "profile":
        setNavValue(Pages.PROFILE);
        break;
      default:
    }
  }
};

const AppContainer = (props: AppProps) => {
  const history = useHistory();
  const classes = useStyles();
  const { position, getLocation, locationName } = useGeoPosition();
  const [navValue, setNavValue] = useState<string | null>(null);
  const [searchView, setSearchView] = useState<SearchView | null>(null);
  const [filterResults, setFilterResults] = useState([]);
  const [device, setDevice] = React.useState<DeviceInfo>(null);
  // fetch everything on app load for now
  const getAllDeals = async () => {
    const url = process.env.REACT_APP_API_URL || "";

    //call the fetch function
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setFilterResults(data);
      });
  };
  React.useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    const getDeviceInfo = async () => {
      const deviceInfo = await Plugins.Device.getInfo();
      setDevice(deviceInfo);
    };

    getDeviceInfo();
    checkNavigation({ navValue, setNavValue, history });
    getLocation();
    getAllDeals();
    return () => {
      unlisten();
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    // when navigating on bottom clear the search stuff
    localStorage.setItem("filters", null);
    setSearchView(null);
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
            device: device,
            devicePosition: position,
            filterResults: filterResults,
            setFilterResults: setFilterResults,
            deviceLocationName: locationName,
            refetchDeals: getAllDeals
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
              to="/explore"
              label="Explore"
              value={Pages.EXPLORE}
              icon={<Explore />}
            />
            <BottomNavigationAction
              component={RouterLink}
              to="/search"
              label="Search"
              value={Pages.SEARCH}
              icon={<Search />}
            />
            <BottomNavigationAction
              component={RouterLink}
              to="/deals"
              label="Add Deal"
              value={Pages.ADD_DEAL}
              icon={<AddCircleOutline />}
            />
            <BottomNavigationAction
              component={RouterLink}
              to="/profile"
              label="Profile"
              value={Pages.PROFILE}
              icon={<SupervisorAccountOutlined />}
            />
          </BottomNavigation>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default AppContainer;
