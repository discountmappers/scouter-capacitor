import React, { useContext, useEffect, useState } from "react";
import { useGeoPosition } from "hooks/useGeoPosition";
import { Grid } from "@material-ui/core";
import { MapContainerActions } from "components/Search";
import "./map.css";
import MapView from "components/Search/Map";
import { ListView } from "components/Search";
import { AppContext } from "./AppContainer";
import { SearchView, mockResults } from "utils/general";
import { SearchFilter } from "components/Search/searchFilter";
import { handleObs, showBack } from "services/backService";
import { useHistory } from "react-router-dom";
import { filter } from "rxjs/operators";
type SearchContainerProps = {
  listView: boolean;
};

export const SearchContainerContext = React.createContext({
  locationName: "",
  searchByCustom: (location: string) => new Promise<void>(resolve => {}),
  setResults: (value: any) => {}
});

export const SearchContainer = (props: SearchContainerProps) => {
  const history = useHistory();
  const { searchView, setSearchView, filterResults } = useContext(AppContext);
  const { locationName, getLocation, searchByCustom } = useGeoPosition();
  const [filtered, setFiltered] = useState(filterResults);
  // populate the text field & default center
  // go  back the filter page
  useEffect(() => {
    // dont show when we are on main search page and not in a view
    const show = history.location.pathname !== "/search" || searchView !== null;
    showBack(show);
    const handle = handleObs.subscribe(val => {
      // we are already at the filter so go back to previous
      if (searchView === null) history.goBack();

      setSearchView(null);
    });

    return () => {
      showBack(false);
      handle.unsubscribe();
    };
  }, [searchView]);

  const submitFilters = (filters: Array<string>) => {
    const filt = filterResults.filter(fil => filters.includes(fil.category));
    setFiltered(filt);
    setSearchView(SearchView.LIST);
  };
  const setResults = (value: any) => {
    setSearchView(SearchView.LIST);
  };

  return (
    <SearchContainerContext.Provider
      value={{
        locationName,
        searchByCustom,
        setResults
      }}
    >
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10} md={7} lg={4}>
          <div className="actionGroup">
            <MapContainerActions
              search={searchByCustom}
              location={locationName}
            />
          </div>
        </Grid>
        <Grid item xs={12}></Grid>
        {searchView === null ? (
          <SearchFilter submitFilters={submitFilters} />
        ) : searchView === SearchView.MAP ? (
          <MapView results={filtered} />
        ) : (
          <ListView results={filtered} />
        )}
      </Grid>
    </SearchContainerContext.Provider>
  );
};
