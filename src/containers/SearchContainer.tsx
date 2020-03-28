import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from 'utils/google'
import { useGeoPosition } from "hooks/useGeoPosition";
import { Grid } from "@material-ui/core";
import { MapContainerActions } from "components/Search";
import './map.css'
import MapView from "components/Search/Map";

type SearchContainerProps = {
    listView: boolean
}
export const SearchContainerContext = React.createContext({
    position: { lat: 0, lng: 0 },
    locationName: '',
    searchByCustom: (location: string) => new Promise<void>(resolve => { }),
})

export const SearchContainer = (props: SearchContainerProps) => {
    const { position, locationName, getLocation, searchByCustom } = useGeoPosition()
    const [open, setMap] = useState(props.listView)

    // populate the text field & default center 
    useEffect(() => {
        getLocation()
    }, [])


    return (
        <SearchContainerContext.Provider value={{ position, locationName, searchByCustom }}>
            <Grid container justify="center" alignItems="center">
                {true ? <MapView /> : ''}
            </Grid >
        </SearchContainerContext.Provider >
    )

};
