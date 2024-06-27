import { useState, useEffect, useCallback } from "react";
import { Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import {
  Box,
  // CheckboxDropdown,
  GenericButton,
  GenericSelect,
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
import { LoaderPageWithoutBG } from "../../assets";
import NavigateToListings from "../AdScreens/NavigateToListings copy";

const Listings = () => {
  const [listingProfiles, setListingProfiles] = useState([]);
  const [mediaUrls, setMediaUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [areaRange, setAreaRange] = useState("");
  const [profileLength, setProfileLength] = useState(0);
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [listingsState, setListingsState] = useState([]);
  const [searchKeywordsState, setSearchKeywordsState] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  // const [place, setPlace] = useState(null);

  const location = useLocation();
  const { searchKeywords, place } = location.state || {};

  // Fetch dropdown options
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
            "Specialization",
            // "Doctor Package",
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

          setDropdownOptions(optionsMap);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

  // Fetch listings based on search criteria
  useEffect(() => {
    const fetchListings = async () => {
      const query = new URLSearchParams({
        "cwp_query[post_type]": "listing",
        "cwp_query[orderby]": "ASC",
        "cwp_query[s]": searchKeywordsState,
        "cwp_query[fc-google-address_range]": areaRange.toString(),
        "cwp_query[fc-google-address]": place?.address || "",
        "cwp_query[fc-google-address_lat]": place?.lat || "",
        "cwp_query[fc-google-address_lng]": place?.lng || "",
      }).toString();

      console.log(
        `Query: https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`
      );

      try {
        const response = await axios.get(
          `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`
        );
        console.log("Response data:", response.data);
        setListingsState(response.data);

        // Filter profiles based on fetched listings
        const filteredProfiles = listingProfiles.filter((profile) =>
          response.data.includes(profile.id)
        );
        setFilteredProfiles(filteredProfiles);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    if (searchKeywordsState || areaRange || place) {
      fetchListings();
    }
  }, [searchKeywordsState, areaRange, place]);

  // Fetch listing and media
  useEffect(() => {
    const fetchPosts = async () => {
      const url = "https://jsappone.demowp.io/wp-json/wp/v2/listing";
      try {
        const response = await axios.get(url);
        const profileData = response.data;

        // Fetch media URLs
        const mediaIds = profileData
          .map((post) => post.featured_media)
          .filter((id) => id);
        const mediaResponses = await Promise.all(
          mediaIds.map((id) =>
            axios.get(`https://jsappone.demowp.io/wp-json/wp/v2/media/${id}`)
          )
        );
        const mediaData = mediaResponses.reduce((acc, media) => {
          acc[media.data.id] = media.data.source_url;
          return acc;
        }, {});
        setMediaUrls(mediaData);

        // Transform profile data to match the expected structure
        const transformedProfileData = profileData.map((profile) => ({
          id: profile.id,
          profileImg:
            mediaData[profile.featured_media] || IMAGES.DOCTOR_LIST_PROFILE,
          title: profile.title.rendered,
          designation:
            profile.cubewp_post_meta["cwp_field_40228862441"]?.meta_value ||
            "N/A",
          languages:
            profile.cubewp_post_meta["fc-languages"]?.meta_value.split(", ") ||
            [],
          specialization:
            profile.cubewp_post_meta[
              "cwp_field_136461069401"
            ]?.meta_value.split(", ") || [],
          qualifications:
            profile.cubewp_post_meta[
              "cwp_field_930729608352"
            ]?.meta_value.split(", ") || [],
          gender:
            profile.cubewp_post_meta["cwp_field_224925973684"]?.meta_value ||
            "N/A",
          doctorPackage:
            profile.cubewp_post_meta[
              "cwp_field_631649982329"
            ]?.meta_value.split(", ") || [],
          address:
            profile.cubewp_post_meta["fc-google-address"]?.meta_value.address ||
            "N/A",
          phone: profile.cubewp_post_meta["fc-phone"]?.meta_value || "N/A",
          comment_status: profile.comment_status || "N/A",
          status: profile.status || "N/A",
        }));

        setListingProfiles(transformedProfileData);
        setFilteredProfiles(transformedProfileData);
        setProfileLength(transformedProfileData.length);
      } catch (error) {
        console.error("Error fetching posts or media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Synchronize search keywords and place
  useEffect(() => {
    if (searchKeywords) {
      setSearchKeywordsState(searchKeywords);
    }
    if (place) {
      setAreaRange([place.lat, place.lng]);
    }
  }, [searchKeywords, place]);

  // Filter profiles based on searchKeywordsState, place, and selectedOptions
  useEffect(() => {
    const filterProfiles = () => {
      let filtered = [...listingProfiles];

      // Keyword search
      if (searchKeywordsState.trim() !== "") {
        filtered = filtered.filter((profile) =>
          profile.title
            .toLowerCase()
            .includes(searchKeywordsState.toLowerCase())
        );
      }

      // Address filter
      if (place && place.address.trim() !== "") {
        const addressFilter = place.address.toLowerCase();
        filtered = filtered.filter((profile) =>
          profile.address.toLowerCase().includes(addressFilter)
        );
      }

      // Location filter
      if (place && place.lat && place.lng) {
        filtered = filtered.filter((profile) => {
          // Perform distance calculation if necessary
          return true; // Modify this line based on your distance calculation logic
        });
      }

      if (selectedOptions.length > 0) {
        selectedOptions.forEach((selectedOption) => {
          filtered = filtered.filter((profile) => {
            let profileField = [];
            switch (selectedOption.label) {
              case "Languages":
                profileField = profile.languages || [];
                break;
              case "Qualifications":
                profileField = profile.qualifications || [];
                break;
              case "Specialization":
                profileField = profile.specialization || [];
                break;
              case "Gender":
                profileField = [profile.gender];
                break;
              // case "Doctor Package":
              //   profileField = profile.doctorPackage || [];
              //   break;
              default:
                return true;
            }

            profileField = profileField.map((item) =>
              item.toString().trim().toLowerCase()
            );
            const selectedValues = selectedOption.values.map((item) =>
              item.value.toString().trim().toLowerCase()
            );

            const matches = selectedValues.some((value) =>
              profileField.includes(value)
            );

            return matches;
          });
        });
      }

      return filtered;
    };

    const filteredProfiles = filterProfiles();
    setFilteredProfiles(filteredProfiles);
  }, [listingProfiles, searchKeywordsState, place, selectedOptions]);

  const handleDropdownOptions = useCallback((label, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      const optionIndex = updatedOptions.findIndex(
        (option) => option.label === label
      );

      const values = selectedOption.map((item) => ({
        id: item.id,
        label: item.label,
        value: item.value.toLowerCase(),
      }));

      if (optionIndex >= 0) {
        if (values.length > 0) {
          updatedOptions[optionIndex] = { label, values };
        } else {
          updatedOptions.splice(optionIndex, 1); // Remove the option if no values are selected
        }
      } else if (values.length > 0) {
        updatedOptions.push({ label, values });
      }

      return updatedOptions;
    });
  }, []);

  // Function to calculate the distance between two coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // console.log("selectedOptions", selectedOptions);

  // console.log("filteredProfiles", filteredProfiles);

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

  const center = {
    lat: place?.lat || 0,
    lng: place?.lng || 0,
  };

  const handleSearchKeywordsChange = (e) => {
    setSearchKeywordsState(e.target.value);
  };

  const handleTemperatureRangeChange = (newRange) => {
    setAreaRange(newRange);
  };

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
        "cwp_query[fc-google-address_range]": areaRange,
        "cwp_query[fc-google-address]": place?.address || "",
        "cwp_query[fc-google-address_lat]": place?.lat || "",
        "cwp_query[fc-google-address_lng]": place?.lng || "",
      }).toString();

      const response = await axios.get(
        `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`
      );

      setListingsState(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <NavigateToListings />
      </div>
    );
  }

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
                      defaultValue={areaRange}
                      min={0}
                      max={500}
                      step={0.1}
                      value={areaRange}
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
                <GenericSelect
                  key={label}
                  isMulti
                  name={label}
                  minWidth="120px"
                  minHeight="34px"
                  height="34px"
                  borderColor="#EEF0F5"
                  borderRadius="4px"
                  bgcolor="#F8F9FC"
                  placeholder={`Choose ${label}`}
                  placeholderColor="#333333"
                  iconColor="#06312E"
                  menuPlacement="auto"
                  options={dropdownOptions[label]}
                  onSelect={(selectedOption) =>
                    handleDropdownOptions(label, selectedOption)
                  }
                  value={
                    selectedOptions.find((option) => option.label === label)
                      ?.values || []
                  }
                  // singleSelect={label === "Doctor Package"}
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
                  <span className="text-dark">{filteredProfiles.length}</span>{" "}
                  search result for{" "}
                  <span className="fw-bold">{searchKeywords} </span> in
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
              {filteredProfiles.map((profileItem) => (
                <ProfileCard
                  key={profileItem.id}
                  enableSponsoredProfile
                  columnPadding
                  singleProfile={profileItem}
                />
              ))}
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
                {filteredProfiles.map((profileItem) => (
                  <ProfileCard
                    key={profileItem.id}
                    singleProfile={profileItem}
                  />
                ))}
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
