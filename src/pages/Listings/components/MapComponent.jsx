import React, { useMemo, useRef, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { Typography } from "../../../components/GenericComponents";
import IMAGES from "../../../assets/images";

const checkIfValidLatitudeAndLongitude = (lat, lng) => {
  const latRegex = /^(\-?|\+?)?\d+(\.\d+)?$/;
  const lngRegex = /^(\-?|\+?)?\d+(\.\d+)?$/;
  return latRegex.test(lat) && lngRegex.test(lng);
};

const MapComponent = ({
  filteredProfiles,
  selectedListing,
  handleMarkerClick,
  handleCloseInfoWindow,
  getProfileImgUrl,
  markerStyle,
}) => {
  const mapRef = useRef(null);

  const bounds = useMemo(() => {
    if (!window.google) return null;

    const bounds = new window.google.maps.LatLngBounds();
    filteredProfiles.forEach((profile) => {
      if (checkIfValidLatitudeAndLongitude(profile.lat, profile.lng)) {
        bounds.extend(new window.google.maps.LatLng(profile.lat, profile.lng));
      }
    });
    return bounds;
  }, [filteredProfiles]);

  useEffect(() => {
    if (bounds && mapRef.current) {
      mapRef.current.fitBounds(bounds);
    }
  }, [bounds]);

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
        mapRef.current = map;
        if (bounds) {
          map.fitBounds(bounds);
        }
      }}
    >
      {filteredProfiles?.map((profile) =>
        checkIfValidLatitudeAndLongitude(profile.lat, profile.lng) ? (
          <Marker
            key={profile.id}
            position={{ lat: profile.lat, lng: profile.lng }}
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
      {selectedListing &&
        checkIfValidLatitudeAndLongitude(
          selectedListing.lat,
          selectedListing.lng
        ) && (
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
  );
};

export default MapComponent;
