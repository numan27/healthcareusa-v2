import { useState, useEffect } from "react";
import { Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import {
  Box,
  CheckboxDropdown,
  GenericButton,
  Typography,
} from "../../components/GenericComponents";
import AppLayout from "../../components/Layout/AppLayout";
import AdsSection from "../../components/Shared/AdsSection";
import RangeSlider from "./components/RangeSlider";
import ProfileCard from "./components/ProfileCard";
import { FaCircleInfo } from "react-icons/fa6";
import SearchIcon from "../../assets/SVGs/Search";
import { useLocation } from "react-router-dom";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import axios from "axios";
import IMAGES from "../../assets/images";

const Listings = () => {
  const [temperatureRange, setTemperatureRange] = useState([20, 67]);
  const [profileLength, setProfileLength] = useState(0);
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [listingsState, setListingsState] = useState([]);
  const [searchKeywordsState, setSearchKeywordsState] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const location = useLocation();
  const { searchKeywords, place } = location.state || {};

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await fetch(
          "https://jsappone.demowp.io/wp-json/cubewp-forms/v1/get_form?post_type=listing&form_type=post_type"
        );
        const data = await response.json();

        if (data && data.groups) {
          const fields = data.groups["112156535"].fields;
          const optionsMap = {};

          const dropdownLabels = [
            "Gender",
            "Languages",
            "Qualifications",
            "Specializations",
            "Doctor Package",
          ];

          dropdownLabels.forEach((label) => {
            const field = fields.find((field) => field.label === label);
            if (field && field.label.trim()) {
              const options = JSON.parse(field.options);
              const parsedOptions = options.label.map((label, index) => ({
                id: index,
                label: label,
                value: options.value[index],
              }));
              optionsMap[label] = parsedOptions;
            }
          });
          console.log("Fields from API:", fields);

          const genderField = fields.find((field) => field.label === "Gender");
          const specializationField = fields.find(
            (field) => field.label === "Specialization"
          );

          if (genderField && genderField.label.trim()) {
            const genderOptions = JSON.parse(genderField.options);
            const parsedGenderOptions = genderOptions.label.map(
              (label, index) => ({
                id: index,
                label: label,
                value: genderOptions.value[index],
              })
            );
            optionsMap["Gender"] = parsedGenderOptions;
          }

          if (specializationField && specializationField.label.trim()) {
            const specializationOptions = JSON.parse(
              specializationField.options
            );
            const parsedSpecializationOptions = specializationOptions.label.map(
              (label, index) => ({
                id: index,
                label: label,
                value: specializationOptions.value[index],
              })
            );
            optionsMap["Specialization"] = parsedSpecializationOptions;
          }
          setDropdownOptions(optionsMap);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      const query = new URLSearchParams({
        "cwp_query[post_type]": "listing",
        "cwp_query[orderby]": "ASC",
        "cwp_query[s]": searchKeywordsState,
        "cwp_query[fc-google-address_range]": temperatureRange,
        "cwp_query[fc-google-address]": place?.address || "",
        "cwp_query[fc-google-address_lat]": place?.lat || "",
        "cwp_query[fc-google-address_lng]": place?.lng || "",
      }).toString();

      try {
        const response = await axios.get(
          `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`
        );
        setListingsState(response.data);

        if (place) {
          setMapCenter({ lat: place.lat, lng: place.lng });
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [searchKeywordsState, temperatureRange, place]);

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

  console.log("listingsState", listingsState);

  const center = {
    lat: place?.lat || 0,
    lng: place?.lng || 0,
  };

  const handleSearchKeywordsChange = (e) => {
    setSearchKeywordsState(e.target.value);
  };

  const handleTemperatureRangeChange = (newRange) => {
    setTemperatureRange(newRange);
  };

  // const handleMapCenterChange = (newCenter) => {
  //   setMapCenter(newCenter);
  // };

  const handleDropdownOptions = (value) => {
    setSelectedOptions(value);
  };

  useEffect(() => {
    if (searchKeywords) {
      setSearchKeywordsState(searchKeywords);
    }
    if (place) {
      setTemperatureRange([place.lat, place.lng]);
    }
  }, [searchKeywords, place]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchButton();
  };

  const handleSearchButton = async () => {
    try {
      const query = new URLSearchParams({
        "cwp_query[post_type]": "listing",
        "cwp_query[orderby]": "ASC",
        "cwp_query[s]": searchKeywordsState,
        "cwp_query[fc-google-address_range]": temperatureRange,
        "cwp_query[fc-google-address]": place?.address || "",
        "cwp_query[fc-google-address_lat]": place?.lat || "",
        "cwp_query[fc-google-address_lng]": place?.lng || "",
      }).toString();

      const response = await axios.get(
        `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`
      );

      setListingsState(response.data);

      if (place) {
        setMapCenter({ lat: place.lat, lng: place.lng });
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  return (
    <AppLayout>
      <Container className="min-vh-100 ">
        <div className="mt-5">
          {place && (
            <>
              <p>
                Search Keywords:
                <span className="fw-bold ms-2">{searchKeywords}</span>
              </p>
              <p>
                <span>{place.title}</span>
                <div>
                  <span className="">Address:</span>
                  <span className="fw-bold ms-2">{place.address}</span>
                </div>
                <div>
                  <span className="">Latitude:</span>
                  <span className="fw-bold ms-2">{place.lat}</span>
                </div>
                <div>
                  <span className="">Longitude:</span>
                  <span className="fw-bold ms-2"> {place.lng}</span>
                </div>
              </p>
            </>
          )}
        </div>
        <div>
          <AdsSection margin={4} />
        </div>

        <Row>
          {/* Left Content */}
          <Col lg={9}>
            {/* Public Announcement */}
            <Box
              radius="4px"
              border="1px solid #EF2929"
              width="100%"
              background="#FEEAE9"
              padding="8px 16px"
              className="d-flex align-items-center gap-2 mb-3"
            >
              <FaCircleInfo size={16} color="#EF2929" />
              <Typography
                className="mb-0"
                as="span"
                size="12px"
                color="#EF2929"
                weight="500"
                lineHeight="15px"
              >
                Public Service Announcements (PSA) FDA Approves Wegovy for Heart
                Attack Prevention. (FDA)
              </Typography>
            </Box>

            {/* Search */}
            <Box
              border="1px solid #E4E4E4"
              radius="8px"
              className="custom-shadow-2 py-3 px-4 w-100"
            >
              <Form onSubmit={handleFormSubmit} className="h-100 p-1">
                <Row className="d-flex align-items-center">
                  <Col
                    md={6}
                    className="d-flex align-items-center gap-2 section-responsive-border pe-4 pt-4"
                  >
                    <Typography
                      className="text-nowrap mt-2"
                      as="span"
                      color="#00C1B6"
                      weight="700"
                      lineHeight="18px"
                    >
                      Near Me
                    </Typography>

                    <RangeSlider
                      className="mt-3"
                      defaultValue={temperatureRange}
                      min={0}
                      max={500}
                      step={0.1}
                      value={temperatureRange}
                      // onChange={setTemperatureRange}
                      onChange={handleTemperatureRangeChange}
                    />
                  </Col>

                  <Col md={6} className="d-flex align-items-center">
                    <InputGroup className="search-bar">
                      <Form.Control
                        placeholder="Key words or company"
                        aria-label="Search Keywords"
                        aria-describedby="basic-addon1"
                        className="py-3"
                        value={searchKeywordsState}
                        onChange={handleSearchKeywordsChange}
                      />
                    </InputGroup>

                    <div className="ms-1">
                      <GenericButton
                        onClick={handleSearchButton}
                        width="50px"
                        height="50px"
                        padding="0"
                      >
                        <SearchIcon />
                      </GenericButton>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Box>

            {/* Filters */}
            <div className="my-3 d-flex flex-wrap gap-2">
              {Object.keys(dropdownOptions).map((label) => (
                <CheckboxDropdown
                  key={label}
                  title={label}
                  items={dropdownOptions[label]}
                  selected={label === "Options" ? selectedOptions : []}
                  onChange={
                    label === "Options" ? handleDropdownOptions : undefined
                  }
                  singleSelect={label === "Doctor Package"}
                />
              ))}
            </div>
            <div className="pt-3 mb-3">
              {place ? (
                <Typography
                  as="p"
                  color="#7B7B7B"
                  weight="400"
                  size="16px"
                  lineHeight="26px"
                >
                  <span className="text-dark">{profileLength}</span> search
                  result for <span className="fw-bold">{searchKeywords} </span>{" "}
                  in
                  <span className="fw-bold"> {place?.address} </span>
                </Typography>
              ) : (
                <Typography
                  as="p"
                  color="#7B7B7B"
                  weight="400"
                  size="16px"
                  lineHeight="26px"
                >
                  All results
                </Typography>
              )}

              <div className="d-flex align-items-center gap-2">
                <Typography
                  as="h3"
                  className="mb-1"
                  color="#23262F"
                  weight="700"
                  size="18px"
                  lineHeight="27px"
                >
                  Sponsored
                </Typography>
                <FaCircleInfo className="cursor-pointer" color="#B1B1B1" />
              </div>
            </div>

            <div>
              <ProfileCard
                enableSponsoredProfile
                columnPadding
                setProfileLength={setProfileLength}
              />

              {/* {listingsState.length > 0 ? (
                listingsState.map((listing) => (
                  <ProfileCard
                    key={listing.id}
                    columnPadding
                    enableSponsoredProfile
                    profile={listing}
                    setProfileLength={setProfileLength}
                  />
                ))
              ) : (
                <Typography
                  as="p"
                  color="#7B7B7B"
                  weight="400"
                  size="16px"
                  lineHeight="26px"
                >
                  No results found.
                </Typography>
              )} */}
            </div>

            <AdsSection margin={3} padding={0} />

            <div className="my-4 pt-2">
              <Typography
                as="h2"
                className="mb-0"
                color="#23262F"
                size="24px"
                lineHeight="36px"
                weight="700"
              >
                All Results
              </Typography>

              <div className="mt-3">
                <ProfileCard setProfileLength={setProfileLength} />
                <div>
                  {/* {listingsState.length > 0 ? (
                    listingsState.map((listing) => (
                      <ProfileCard
                        key={listing.id}
                        profile={listing}
                        setProfileLength={setProfileLength}
                      />
                    ))
                  ) : (
                    <Typography
                      as="p"
                      color="#7B7B7B"
                      weight="400"
                      size="16px"
                      lineHeight="26px"
                    >
                      No results found.
                    </Typography>
                  )} */}
                </div>
              </div>
            </div>
          </Col>

          {/* Sidebar */}
          <Col
            style={{
              position: "sticky",
              top: "50px",
              height: "fit-content",
            }}
            lg={3}
            md={6}
            className="pb-4"
          >
            <Box className="w-100 mb-3">
              {place && (
                <LoadScript googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg">
                  {/* // <LoadScript googleMapsApiKey="AIzaSyDyTmixiuM073rwv8ADLPl6mqrf8S3DNFQ"> */}
                  <GoogleMap
                    className="rounded-3"
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                  ></GoogleMap>
                </LoadScript>
              )}
            </Box>
            <div>
              <img
                src={IMAGES.ADS_VERTICAL_IMG}
                className="img-fluid"
                alt="ads"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </AppLayout>
  );
};

export default Listings;
