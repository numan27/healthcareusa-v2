import { useEffect, useState } from "react";

const LocationFetcher = ({ setPlace, setLocation, setIsLoadingLocation }) => {
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setPlace({ lat: latitude, lng: longitude, address });
          setLocation(address);
        } else {
          setLocation("Current Location");
        }
        setIsLoadingLocation(false);
      });
    }
  }, [setPlace, setLocation, setIsLoadingLocation]);

  return null;
};

export default LocationFetcher;
