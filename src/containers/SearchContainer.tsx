import React, { useContext, useEffect, useState } from "react";
import { useGeoPosition } from "hooks/useGeoPosition";
import { Grid } from "@material-ui/core";
import { MapContainerActions } from "components/Search";
import "./map.css";
import MapView from "components/Search/Map";
import { ListView } from "components/Search";
import { AppContext } from "./AppContainer";
import { SearchView, isEmpty } from "utils/general";
import { SearchFilter, FilterStateType } from "components/Search/searchFilter";
import { handleObs, showBack } from "services/backService";
import { useHistory } from "react-router-dom";
type SearchContainerProps = {
  listView: boolean;
};

export const SearchContainerContext = React.createContext({
  searchByCustom: (location: string) => new Promise<void>(resolve => {})
});

export const SearchContainer = (props: SearchContainerProps) => {
  const history = useHistory();
  const {
    searchView,
    setSearchView,
    filterResults,
    deviceLocationName,
    devicePosition
  } = useContext(AppContext);
  //override the device location if searching for something else
  const { locationName, position, searchByCustom } = useGeoPosition();
  const [filtered, setFiltered] = useState(filterResults);
  // default position to the device location, then update if changing
  const [updatedPosition, setUpdatedPosition] = useState(false);
  // populate the text field & default center
  // go  back the filter page
  useEffect(() => {
    // dont show when we are on main search page and not in a view
    const show = history.location.pathname !== "/search" || searchView !== null;
    showBack(show);
    const handle = handleObs.subscribe(val => {
      // hacky way for now, maybe put the views in their own routes /map & /list
      // no more back button on filter page
      if (searchView === SearchView.MAP) {
        setSearchView(SearchView.LIST);
      } else {
        setSearchView(null);
      }
    });
    return () => {
      showBack(false);
      handle.unsubscribe();
    };
  }, [searchView]);

  const submitFilters = (filters: FilterStateType) => {
    localStorage.setItem("filters", JSON.stringify(filters));
    performFilter(filters);
    setSearchView(SearchView.LIST);
  };

  const performFilter = (filters: FilterStateType) => {
    const filt = filterResults.filter(fil => filters[fil.category]);
    setFiltered(filt);
  };

  const updateSearchLocation = (place: string) => {
    searchByCustom(place);
    setUpdatedPosition(true);
  };

  // use the device location unless overriding in the search bar
  const newPosition = updatedPosition ? position : devicePosition;
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={10} md={7} lg={4}>
        <div className="actionGroup">
          <MapContainerActions
            search={updateSearchLocation}
            location={isEmpty(locationName) ? deviceLocationName : locationName}
          />
        </div>
      </Grid>
      <Grid item xs={12}></Grid>
      {searchView === null ? (
        <SearchFilter submitFilters={submitFilters} />
      ) : searchView === SearchView.MAP ? (
        <MapView results={filtered} updatedPosition={newPosition} />
      ) : (
        <ListView results={filtered} />
      )}
    </Grid>
  );
};
