import React, { useEffect, useState, useContext } from "react";
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from 'utils/google'
import { useGeoPosition } from "hooks/useGeoPosition";
import { Grid } from "@material-ui/core";
import { MapContainerActions } from "components/Search";
import './map.css'
import MapView from "components/Search/Map";
import { HeaderContext } from "./AppContainer";
import { SearchView } from "utils/general";
import SearchFilter from "components/Search/searchFilter";

type SearchContainerProps = {
    listView: boolean
}
export const SearchContainerContext = React.createContext({
    position: { lat: 0, lng: 0 },
    locationName: '',
    searchByCustom: (location: string) => new Promise<void>(resolve => { }),
})

export const SearchContainer = (props: SearchContainerProps) => {
    const { searchView, setSearchView } = useContext(HeaderContext)
    const { position, locationName, getLocation, searchByCustom } = useGeoPosition()

    // populate the text field & default center 
    useEffect(() => {
        getLocation()
    }, [])

    return (
        <SearchContainerContext.Provider value={{ position, locationName, searchByCustom }}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={10} sm={6}>
                    <div className="actionGroup">
                        <MapContainerActions search={searchByCustom} location={locationName} />
                    </div>
                </Grid>
                {searchView === null ? <SearchFilter /> : searchView === SearchView.MAP ? <MapView /> : ''}

            </Grid >
        </SearchContainerContext.Provider >
    )

};
