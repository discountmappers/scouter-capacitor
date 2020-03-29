import React, { useContext, useEffect, useState } from 'react';
import { useGeoPosition } from 'hooks/useGeoPosition';
import { Grid } from '@material-ui/core';
import { MapContainerActions } from 'components/Search';
import './map.css';
import MapView from 'components/Search/Map';
import { ListView } from 'components/Search';
import { AppContext } from './AppContainer';
import { SearchView, mockResults } from 'utils/general';
import { SearchFilter } from 'components/Search/searchFilter';
import { handleObs, showBack } from 'services/backService';
import { useHistory } from 'react-router-dom';
type SearchContainerProps = {
  listView: boolean;
};

export const SearchContainerContext = React.createContext({
  locationName: '',
  searchByCustom: (location: string) => new Promise<void>(resolve => {}),
  filterResults: [...mockResults],
  setResults: (value: any) => {}
});

export const SearchContainer = (props: SearchContainerProps) => {
  const history = useHistory();
  const { searchView, setSearchView } = useContext(AppContext);
  const [filterResults, setFilterResults] = useState(mockResults);
  const { locationName, getLocation, searchByCustom } = useGeoPosition();

  // populate the text field & default center
  // go  back the filter page
  useEffect(() => {
    showBack(true);
    const handle = handleObs.subscribe(val => {
      // we are already at the filter so go back to previous
      if (searchView === null) history.goBack();

      setSearchView(null);
    });
    getLocation();

    return () => {
      showBack(false);
      handle.unsubscribe();
    };
  }, [searchView]);

  const setResults = (value: any) => {
    //setFilterResults(value);
    setSearchView(SearchView.LIST);
  };

  return (
    <SearchContainerContext.Provider
      value={{
        locationName,
        searchByCustom,
        filterResults,
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
          <SearchFilter />
        ) : searchView === SearchView.MAP ? (
          <MapView />
        ) : (
          <ListView />
        )}
      </Grid>
    </SearchContainerContext.Provider>
  );
};
