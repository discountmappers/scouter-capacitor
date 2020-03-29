import React from "react";
import { Grid, Tooltip } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "utils/google";
import RoomIcon from '@material-ui/icons/Room';
import 'components/DealDetails/mapDetail'
import './details.css'

type MapDetailViewProps = {
  deal: any
};


const MapDetailView = (props: MapDetailViewProps) => {
  const { deal} = props
  // this css is needed or the markers will shift!!!
  const CustomMarker = ({ deal }:any) =>
    <Tooltip title={deal.name} aria-label="add">
      <div style={{ cursor: 'pointer', position: 'absolute', transform: 'translate(-50%, -100%)' }}>
        <RoomIcon/>
      </div>
    </Tooltip>

  const position = { lat: deal.lat, lng: deal.lng }


  const getMarker = () => {
    return <CustomMarker key={deal.lat} lat={deal.lat} lng={deal.lng} deal={deal}/>
  }
  return (
    <>
      <Grid item xs={10} md={7} lg={4}>
        <div className="mapContainer">

          <GoogleMapReact
            key={deal.lng}
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={position}
            defaultZoom={15}
          >
            {getMarker()}
          </GoogleMapReact>
        </div>
      </Grid>
    </>
  )
}

export default MapDetailView;



