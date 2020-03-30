import React, { useContext, useEffect, useState } from 'react';
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

const MapDetailView = (props: MapDetailViewProps) => {
  const { deal } = props
  const { position } = useContext(AppContext);
  const [nearbyLocations, setNearbyLocations] = useState<any>([])
  const [hasLocation, setHasLocation] = useState<Boolean>(
    deal.lat !== null && deal.lng !== null
  )

  //like componentDidUpdate
  useEffect(() => {
    setHasLocation(deal.lat !== null && deal.lng !== null)
  }, [deal]);


  const fetchNearbyLocations = async (deal: any) => {
    let currentLocation = new google.maps.LatLng(position.lat, position.lng);
    let request: any = {
      location: currentLocation,
      radius: "3000",
      keyword: deal.name
    };
    // pass in a dummy div not worried about that
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.nearbySearch(request, callback);
  }

  const callback = (response: any, status: any) => {
    const nearbyResults: Array<Object> = []

    if (status === google.maps.places.PlacesServiceStatus.OK) {
      response.forEach((resp: any) => {
        const respPositon = {
          lat: resp.geometry.location.lat(),
          lng: resp.geometry.location.lng()
        }
        nearbyResults.push(respPositon)
      })
    }
    setNearbyLocations(nearbyResults)
    setHasLocation(true)
  }

  // Get nearby locations if lat and lng are not provided
  if(!hasLocation){
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

  const detailPosition = deal.lat===null && deal.lng===null ? position
    : { lat: deal.lat, lng: deal.lng }

  const getSingleLocation = () => {
    return <CustomMarker
      key={detailPosition.lat}
      lat={detailPosition.lat}
      lng={detailPosition.lng}
      deal={deal} />
  }

  const getMultipleLocations = () => {
    return nearbyLocations.map((nearby: { lat: any; lng: any; }) => {
      return (
        <CustomMarker
          key={nearby.lat}
          lat={nearby.lat}
          lng={nearby.lng}
          deal={deal}
        />
      )
    })
  }

  const getMarker = deal.lat===null && deal.lng===null ? getMultipleLocations() : getSingleLocation()
  return (
    <>
      <Grid item xs={10} md={7} lg={4}>
        <div className="mapDetailsContainer">
          <GoogleMapReact
            key={detailPosition.lng}
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={detailPosition}
            defaultZoom={deal.lat===null && deal.lng===null ? 12 : 15}
          >
            {getMarker}
          </GoogleMapReact>
        </div>
      </Grid>
    </>
  );
};

export default MapDetailView;
