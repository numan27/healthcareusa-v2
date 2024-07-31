import React, { useState, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { LoadScriptNext, Autocomplete } from "@react-google-maps/api";
import {
  GenericInput,
  Typography,
} from "../../../components/GenericComponents";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LoaderCenter } from "../../../assets/Loader";

const libraries = ["places"];

const BusinessAddress = ({ formData, setFormData }) => {
  const [location, setLocation] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const autocompleteRef = useRef(null);

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const addressComponents = place.address_components;
        const updatedFormData = {
          ...formData,
          streetAddress: place.formatted_address,
          lat: place.geometry.location.lat().toString(), // convert lat to string
          lng: place.geometry.location.lng().toString(), // convert lng to string
        };

        addressComponents.forEach((component) => {
          if (component.types.includes("locality")) {
            updatedFormData.city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            updatedFormData.state = component.short_name;
          }
          if (component.types.includes("postal_code")) {
            updatedFormData.zip = component.long_name;
          }
        });

        const completeAddress = `${updatedFormData.streetAddress || ""}, ${
          updatedFormData.city || ""
        }, ${updatedFormData.state || ""} ${updatedFormData.zip || ""}`;
        setFormData({ ...updatedFormData, completeAddress });
      }
    }
  };

  const fetchCurrentLocation = () => {
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
          setLocation(address);
          const place = data.results[0];
          const addressComponents = place.address_components;
          const updatedFormData = {
            ...formData,
            streetAddress: address,
            lat: latitude.toString(), // convert lat to string
            lng: longitude.toString(), // convert lng to string
          };

          addressComponents.forEach((component) => {
            if (component.types.includes("locality")) {
              updatedFormData.city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              updatedFormData.state = component.short_name;
            }
            if (component.types.includes("postal_code")) {
              updatedFormData.zip = component.long_name;
            }
          });

          const completeAddress = `${updatedFormData.streetAddress || ""}, ${
            updatedFormData.city || ""
          }, ${updatedFormData.state || ""} ${updatedFormData.zip || ""}`;
          setFormData({ ...updatedFormData, completeAddress });
        }
        setIsLoadingLocation(false);
      });
    }
  };

  const handleClear = () => {
    setLocation("");
    setFormData({
      ...formData,
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      completeAddress: "",
      lat: null,
      lng: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    const completeAddress = `${updatedFormData.streetAddress || ""}, ${
      updatedFormData.city || ""
    }, ${updatedFormData.state || ""} ${updatedFormData.zip || ""}`;
    setFormData({ ...updatedFormData, completeAddress });
    if (name === "streetAddress") {
      setLocation(value);
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <LoadScriptNext
      googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg"
      libraries={libraries}
    >
      <div className="">
        <Typography
          weight="600"
          align="center"
          color="#070026"
          size="24px"
          font="Inter"
          lineHeight="36px"
        >
          What is your Business Address?
        </Typography>
        <Typography
          weight="400"
          align="center"
          color="#73777D"
          size="16px"
          font="Inter"
          lineHeight="24px"
        >
          Provide the details about the location
        </Typography>
        <Form className="mt-5">
          <Row>
            <Col xs={12} className="mb-2">
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div style={{ width: "100%" }}>
                  <Form.Label>Address</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      background="#F8F9FC"
                      borderColor="#EEF0F5"
                      name="streetAddress"
                      placeholder="Enter Street Address"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        handleInputChange(e);
                      }}
                    />
                    <InputGroup.Text className="bg-white border-0 p-2">
                      <FaLocationCrosshairs
                        color="#06312E"
                        size={20}
                        onClick={fetchCurrentLocation}
                        style={{ cursor: "pointer" }}
                      />
                    </InputGroup.Text>
                    {isLoadingLocation && <LoaderCenter />}
                  </InputGroup>
                </div>
              </Autocomplete>
            </Col>
            <Col md={4} className="mb-2">
              <GenericInput
                type="text"
                background="#F8F9FC"
                borderColor="#EEF0F5"
                name="city"
                label="City"
                height="34px"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={4} className="mb-2">
              <GenericInput
                type="text"
                background="#F8F9FC"
                borderColor="#EEF0F5"
                name="state"
                label="State"
                height="34px"
                placeholder="Enter State"
                value={formData.state}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={4} className="mb-2">
              <GenericInput
                type="text"
                background="#F8F9FC"
                borderColor="#EEF0F5"
                name="zip"
                label="Zip"
                height="34px"
                placeholder="Enter Zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </LoadScriptNext>
  );
};

BusinessAddress.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default BusinessAddress;
