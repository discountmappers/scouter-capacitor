import { useState, useContext } from "react";
import { BASE_GEOCODE_API, GOOGLE_API_KEY } from "utils/google";
import { AppContext } from "containers/AppContainer";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;

type GoogleGeocodeResponse = {
  plus_code: { compound_code: string; global_code: string };
  results: any[];
};
const manhattanCenter = {
  lat: 40.7831,
  lng: -73.9712
};
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// hook to get the users currently location with browser api
export const useGeoPosition = () => {
  // the default
  const [position, setPosition] = useState(manhattanCenter);

  //const { position, setPosition } = useContext(AppContext);
  const [locationName, setLocationName] = useState("");
  const extract_pos = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("setting lat", lat);
    setPosition({
      lat,
      lng
    });
    console.log("lat", lat);
    console.log("lng", lng);
    getCityName(lat, lng);
  };

  // get the location based on lat and long
  const getCityName = async (lat: string, lng: string) => {
    const response = await fetch(
      `${BASE_GEOCODE_API}?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );
    const googleData: GoogleGeocodeResponse = await response.json();
    const [, ...city] = googleData?.plus_code?.compound_code.split(" ");
    setLocationName(city.join(" "));
  };

  const getLocation = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      extract_pos(coordinates);
    } catch (e) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(extract_pos, console.error);
      } else {
        console.info("Location api not avaialble, defaulting to manhattan");
      }
    }
  };

  // reverse lookup, get details on the location typed in
  const searchByCustom = async (someLocation: string) => {
    const response = await fetch(
      `${BASE_GEOCODE_API}?address=${someLocation}&key=${GOOGLE_API_KEY}`
    );
    const googleData: GoogleGeocodeResponse = await response.json();
    console.log(googleData);
    const { lat, lng } = googleData?.results?.[0]?.geometry?.location;
    console.log(lat, lng);
    setLocationName(googleData?.results?.[0]?.formatted_address);
    setPosition({ lat, lng });
  };

  return { position, locationName, getLocation, searchByCustom };
};
