import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCenter } from "../../../../assets";
import IMAGES from "../../../../assets/images";

const ProfileMap = ({ profile }) => {
  const [selectedListing, setSelectedListing] = useState(null);

  const mapContainerStyle = {
    height: "300px",
    width: "100%",
  };

  const center = {
    lat: profile.coordinates[0],
    lng: profile.coordinates[1],
  };

  const handleMarkerClick = (profile) => {
    setSelectedListing(profile);
  };

  const handleCloseInfoWindow = () => {
    setSelectedListing(null);
  };

  if (!window.google || !window.google.maps) {
    return (
      <div>
        <LoaderCenter />
      </div>
    );
  }

  const markerStyle = {
    url: profile.profileImg,
    scaledSize: new window.google.maps.Size(38, 38),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(19, 19),
  };

  const getProfileImgUrl = () => {
    return IMAGES.MALE_CIRCLE_PLACEHOLDER;
  };

  return (
    <div style={mapContainerStyle}>
      <LoadScriptNext googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg">
        {window.google && window.google.maps && (
          <GoogleMap
            className="rounded-3"
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
          >
            <Marker
              style={{ borderRadius: "50%" }}
              key={profile.id}
              position={{
                lat: profile.coordinates[0],
                lng: profile.coordinates[1],
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
              }}
            />
            {selectedListing && (
              <InfoWindow
                key={selectedListing.id}
                position={{
                  lat: selectedListing.coordinates[0],
                  lng: selectedListing.coordinates[1],
                }}
                onCloseClick={handleCloseInfoWindow}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -38),
                  maxWidth: mapContainerStyle.width * 0.6,
                }}
              >
                <div>
                  <Link className="font-weight-bold map-link" to="">
                    {selectedListing.title}
                  </Link>
                  <p>{selectedListing.designation}</p>
                  <p>{selectedListing.address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScriptNext>
    </div>
  );
};

export default ProfileMap;
