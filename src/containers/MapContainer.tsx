import React from "react";
import './map.css'
import GoogleMapReact from 'google-map-react';

export const MapContainer = (props: any) => {
    const manhattanCenter = {
        lat: 40.7831,
        lng: -73.9712
    }

    return (
        // Important! Always set the container height explicitly for the map to show
        <div className="mapContainer">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCOZG2qX2Z6DVHyoJ0aaW9f6E7FYQTsYog" }}
                defaultCenter={manhattanCenter}
                defaultZoom={11}
            >
            </GoogleMapReact>
        </div>
    )

};
