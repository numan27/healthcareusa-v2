import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScriptNext } from '@react-google-maps/api';

const MapComponent = ({ listings }) => {
  const [selectedListing, setSelectedListing] = useState(null);

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
  };

  const defaultCenter = { lat: 45.4211, lng: -75.6903 };

  return (
    <LoadScriptNext googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={defaultCenter}
      >
        {listings.map(listing => (
          <Marker
            key={listing.id}
            position={{ lat: listing.latitude, lng: listing.longitude }}
            onClick={() => setSelectedListing(listing)}
            icon={{
              url: listing.profileImgUrl,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}

        {selectedListing && (
          <InfoWindow
            position={{ lat: selectedListing.latitude, lng: selectedListing.longitude }}
            onCloseClick={() => setSelectedListing(null)}
          >
            <div>
              <h2>{selectedListing.title}</h2>
              <p>{selectedListing.designation}</p>
              <p>{selectedListing.address}</p>
              <img src={selectedListing.profileImgUrl} alt="Profile" style={{ width: "100px" }} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;