import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from 'utils/google'
import { useGeoPosition } from "hooks/useGeoPosition";
import { Grid } from "@material-ui/core";
import { MapContainerActions } from "components/Deals";
import './map.css'

export const MapContainer = (props: any) => {
    const { position, locationName, getLocation, searchByCustom } = useGeoPosition()
    const [open, setMap] = useState(false)

    // populate the text field & default center 
    useEffect(() => {
        getLocation()
    }, [])

    const toggleMap = () => {
        setMap(!open)
    }
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item className="actionGroup">
                <MapContainerActions search={searchByCustom} toggleMap={toggleMap} location={locationName} />
            </Grid>
            {open && <Grid item xs={12}>
                <div className="mapContainer">

                    <GoogleMapReact
                        key={position.lng}
                        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                        defaultCenter={position}
                        defaultZoom={11}
                    >
                    </GoogleMapReact>
                </div>
            </Grid>}
        </Grid >
    )

};
