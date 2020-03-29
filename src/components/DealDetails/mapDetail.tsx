import React, { useContext, useEffect } from 'react';
import { Grid, Tooltip } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "utils/google";
import RoomIcon from "@material-ui/icons/Room";
import "components/DealDetails/mapDetail";
import "./details.css";
import { AppContext } from '../../containers/AppContainer';
import { useGeoPosition } from '../../hooks/useGeoPosition';

type MapDetailViewProps = {
  deal: any;
};

type GoogleNearbyResponse = {
  results: any[];
};




const MapDetailView = (props: MapDetailViewProps) => {
  const { deal } = props
  const { getLocation } = useGeoPosition();

  useEffect(() => {
    getLocation();
  }, []);

  const { position } = useContext(AppContext);

  const fetchNearbyLocations = async (deal: any) => {
    const nearbyResults: Array<Object> = []
    //searching nearby within 2 mile radius
    let baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    let query = `location=${position.lat},${position.lng}&radius=3200&keyword=${deal.name}&key=${GOOGLE_API_KEY}`

    let url = baseUrl + query
    console.log(url)
    const response = await fetch(url,
      {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
          }});
    const googleData: GoogleNearbyResponse = await response.json();

    console.log("DATA: ", googleData)

    googleData.results.map(result => {
      nearbyResults.push({
        lat: result?.geometry?.location?.lat,
        lng: result?.geometry?.location?.lng
      })
    })



    return nearbyResults
  }

  if(deal.lat===null && deal.lng===null){
    fetchNearbyLocations(deal)
  }


  // this css is needed or the markers will shift!!!
  const CustomMarker = ({ deal }: any) => (
    <Tooltip title={deal.name} aria-label="add">
      <div
        style={{
          cursor: "pointer",
          position: "absolute",
          transform: "translate(-50%, -100%)"
        }}
      >
        <RoomIcon />
      </div>
    </Tooltip>
  );

  const detailPosition = deal.lat && deal.lng ? { lat: deal.lat, lng: deal.lng } : position

  const getMarker = () => {
    return <CustomMarker key={detailPosition.lat} lat={detailPosition.lat} lng={detailPosition.lng} deal={deal} />
  }



  return (
    <>
      <Grid item xs={10} md={7} lg={4}>
        <div className="mapDetailsContainer">
          <GoogleMapReact
            key={deal.lng}
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={detailPosition}
            defaultZoom={15}
          >
            {getMarker()}
          </GoogleMapReact>
        </div>
      </Grid>
    </>
  );
};

export default MapDetailView;
