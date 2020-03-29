import { useState, useContext } from 'react';
import { BASE_GEOCODE_API, GOOGLE_API_KEY } from 'utils/google';
import { AppContext } from 'containers/AppContainer';

type GoogleGeocodeResponse = {
  plus_code: { compound_code: string; global_code: string };
  results: any[];
};
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// hook to get the users currently location with browser api
export const useGeoPosition = () => {
  // the default
  // const [position, setPosition] = useState(manhattanCenter)

  const { position, setPosition } = useContext(AppContext);
  const [locationName, setLocationName] = useState('');
  const extract_pos = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setPosition({
      lat,
      lng
    });

    // getCityName(lat, lng)
  };

  // get the location based on lat and long
  const getCityName = async (lat: string, lng: string) => {
    const response = await fetch(
      `${BASE_GEOCODE_API}?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );
    const googleData: GoogleGeocodeResponse = await response.json();
    const [, ...city] = googleData?.plus_code?.compound_code.split(' ');
    setLocationName(city.join(' '));
  };

  // html api
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(extract_pos, console.error);
    } else {
      console.info('Location api not avaialble, defaulting to manhattan');
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
