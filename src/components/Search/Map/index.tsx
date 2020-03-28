import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "utils/google";
import MapContainerActions from "./mapContainerActions";
import { SearchContainerContext } from "containers/SearchContainer";
type MapViewProps = {

};

const MapView = (props: MapViewProps) => {
    const { position, searchByCustom, locationName } = useContext(SearchContainerContext)

    return (
        <>
            <Grid item xs={10} sm={6}>
                <div className="mapContainer">

                    <GoogleMapReact
                        key={position.lng}
                        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                        defaultCenter={position}
                        defaultZoom={15}
                    >
                    </GoogleMapReact>
                </div>
            </Grid>}
        </>
    )
}

export default MapView;



