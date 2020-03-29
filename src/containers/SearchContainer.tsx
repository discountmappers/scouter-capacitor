import React, { useContext, useEffect, useState } from 'react';
import { useGeoPosition } from 'hooks/useGeoPosition';
import { Grid } from '@material-ui/core';
import { MapContainerActions } from 'components/Search';
import './map.css';
import MapView from 'components/Search/Map';
import { ListView } from 'components/Search';
import { AppContext } from './AppContainer';
import { SearchView } from 'utils/general';
import { SearchFilter } from 'components/Search/searchFilter';

type SearchContainerProps = {
  listView: boolean;
};

export const SearchContainerContext = React.createContext({
  position: { lat: 0, lng: 0 },
  locationName: '',
  searchByCustom: (location: string) => new Promise<void>(resolve => {}),
  filterResults: [],
  setResults: (value: any) => {}
});

export const SearchContainer = (props: SearchContainerProps) => {
  const { searchView, setSearchView } = useContext(AppContext);
  const [filterResults, setFilterResults] = useState([]);
  const {
    position,
    locationName,
    getLocation,
    searchByCustom
  } = useGeoPosition();
  console.log('search container: ', filterResults);

  // populate the text field & default center
  useEffect(() => {
    getLocation();
  }, []);

  const setResults = (value: any) => {
    setFilterResults(value);
    setSearchView(SearchView.LIST);
  };

  return (
    <SearchContainerContext.Provider
      value={{
        position,
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
