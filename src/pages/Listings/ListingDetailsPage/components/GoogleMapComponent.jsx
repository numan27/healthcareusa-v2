/* global google */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

const GoogleMapComponent = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current && lat && lng) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 15,
        });

        new google.maps.Marker({
          position: { lat, lng },
          map,
        });
      }
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }
  }, [lat, lng]);

  return <div id="map" ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default GoogleMapComponent;

