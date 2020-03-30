import React, { useContext, useState } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "utils/google";
import RoomIcon from "@material-ui/icons/Room";
import CustomCard from "components/card";
import "../search.css";
import { AppContext } from "containers/AppContainer";
import { Deal } from "utils/general";
type MapViewProps = {
  results?: Array<Deal>;
};

const MapView = (props: MapViewProps) => {
  // this css is needed or the markers will shift!!!
  const CustomMarker = ({ result }: any) => (
    <Tooltip title={result.name} aria-label="add">
      <div
        style={{
          cursor: "pointer",
          position: "absolute",
          transform: "translate(-50%, -100%)"
        }}
        onClick={() => showClick(result)}
      >
        <RoomIcon />
      </div>
    </Tooltip>
  );
  const { position } = useContext(AppContext);
  const [resultCard, setResultCard] = useState(null);
  console.log(position);
  // show the selected choice under the map
  const showClick = (result: any) => {
    setResultCard(result);
  };
  const getMarkers = () => {
    const { results } = props;

    return (
      results &&
      results.map(result => {
        return (
          <CustomMarker
            key={result.lat}
            lat={result.lat}
            lng={result.lng}
            result={result}
          />
        );
      })
    );
  };
  return (
    <>
      <Grid item xs={10} md={7} lg={4}>
        <div className="mapContainer">
          <GoogleMapReact
            key={position.lng}
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={position}
            defaultZoom={15}
          >
            {getMarkers()}
          </GoogleMapReact>
        </div>
      </Grid>
      {resultCard && (
        <>
          <Grid item xs={12}></Grid>
          <Grid className="resultCard" item xs={10} md={7} lg={4}>
            <CustomCard result={resultCard} />
          </Grid>
        </>
      )}
    </>
  );
};

export default MapView;
