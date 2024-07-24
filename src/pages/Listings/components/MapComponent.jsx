import React from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScriptNext,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import IMAGES from "../../../assets/images";
import { Typography } from "../../../components/GenericComponents";

const MapComponent = ({
  center,
  filteredProfiles,
  selectedListing,
  setSelectedListing,
  placeState,
}) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

  const markerStyle = {
    borderRadius: "50%",
    width: "38px",
    height: "38px",
    border: "2px solid black",
  };

  const handleMarkerClick = (profile) => {
    setSelectedListing(profile);
  };

  const handleCloseInfoWindow = () => {
    setSelectedListing("");
  };

  const getProfileImgUrl = () => {
    return IMAGES.MALE_CIRCLE_PLACEHOLDER;
  };

  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg">
      {window.google && (
        <GoogleMap
          className="rounded-3"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={placeState ? 10 : 4}
        >
          {filteredProfiles?.slice(0, 10).map((profile) =>
            profile.lat && profile.lng ? (
              <Marker
                key={profile.id}
                position={{
                  lat: profile.lat,
                  lng: profile.lng,
                }}
                onClick={() => handleMarkerClick(profile)}
                icon={{
                  url: getProfileImgUrl(profile.profileImg),
                  scaledSize: new window.google.maps.Size(38, 38),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(19, 19),
                  labelOrigin: new window.google.maps.Point(19, 38),
                }}
                options={{
                  shape: {
                    type: "circle",
                    coords: [19, 19, 19],
                  },
                  icon: {
                    ...markerStyle,
                  },
                }}
              />
            ) : null
          )}
          {selectedListing && selectedListing.lat && selectedListing.lng && (
            <InfoWindow
              key={selectedListing.id}
              position={{
                lat: selectedListing.lat,
                lng: selectedListing.lng,
              }}
              onCloseClick={handleCloseInfoWindow}
              options={{
                pixelOffset: new window.google.maps.Size(0, -38),
                maxWidth: containerStyle.width * 0.7,
              }}
            >
              <div>
                <Link
                  className="font-weight-bold map-link"
                  to={`/listing-details/${selectedListing.id}`}
                >
                  {selectedListing.title}
                </Link>
                <Typography
                  size="8px"
                  weight="700"
                  color="#64666C"
                  lineHeight="19px"
                  className="mb-0 mt-2"
                >
                  {selectedListing.designation}
                </Typography>

                <div className="d-flex align-items-start gap-1 mt-2">
                  <img width={12} src={IMAGES.LOCATION_ICON} alt="icon" />
                  <p className="mb-0 map-pin-address">
                    {selectedListing.address}
                  </p>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </LoadScriptNext>
  );
};

export default MapComponent;
