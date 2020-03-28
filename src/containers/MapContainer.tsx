import React from "react";
import './map.css'
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from 'utils/env'
export const MapContainer = (props: any) => {
    const manhattanCenter = {
        lat: 40.7831,
        lng: -73.9712
    }
    console.log(process.env.REACT_APP_GOOGLE_API_KEY)
    return (
        // Important! Always set the container height explicitly for the map to show
        <div className="mapContainer">
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                defaultCenter={manhattanCenter}
                defaultZoom={11}
            >
            </GoogleMapReact>
        </div>
    )

};
