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
import { LoaderPageWithoutBG } from "../../assets";

const Listings = () => {
  const [listingProfiles, setListingProfiles] = useState([]);
  const [mediaUrls, setMediaUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [areaRange, setAreaRange] = useState([20, 67]);
  const [profileLength, setProfileLength] = useState(0);
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [listingsState, setListingsState] = useState([]);
  const [searchKeywordsState, setSearchKeywordsState] = useState("");

  const location = useLocation();
  const { searchKeywords, place } = location.state || {};

  // Dropdowns
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

  // Search Form
  // useEffect(() => {
  //   const fetchListings = async () => {
  //     const query = new URLSearchParams({
  //       "cwp_query[post_type]": "listing",
  //       "cwp_query[orderby]": "ASC",
  //       "cwp_query[s]": searchKeywordsState,
  //       "cwp_query[fc-google-address_range]": areaRange,
  //       "cwp_query[fc-google-address]": place?.address || "",
  //       "cwp_query[fc-google-address_lat]": place?.lat || "",
  //       "cwp_query[fc-google-address_lng]": place?.lng || "",
  //     }).toString();

  //     try {
  //       const response = await axios.get(
  //         `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`
  //       );
  //       setListingsState(response.data);

  //       if (place) {
  //         setMapCenter({ lat: place.lat, lng: place.lng });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching listings:", error);
  //     }
  //   };

  //   fetchListings();
  // }, [searchKeywordsState, areaRange, place]);

  // Listings
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
            profile.cubewp_post_meta["fc-languages"]?.meta_value || "N/A",
          address:
            profile.cubewp_post_meta["fc-google-address"]?.meta_value.address ||
            "N/A",
          phone: profile.cubewp_post_meta["fc-phone"]?.meta_value || "N/A",
          comment_status: profile.comment_status || "N/A",
          status: profile.status || "N/A",
        }));

        setListingProfiles(transformedProfileData);
      } catch (error) {
        console.error("Error fetching posts or media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <LoaderPageWithoutBG />
      </div>
    );
  }
  console.log("listingProfiles at Parent", listingProfiles);

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
    setAreaRange(newRange);
  };

  // useEffect(() => {
  //   if (searchKeywords) {
  //     setSearchKeywordsState(searchKeywords);
  //   }
  //   if (place) {
  //     setAreaRange([place.lat, place.lng]);
  //   }
  // }, [searchKeywords, place]);

  // const handleMapCenterChange = (newCenter) => {
  //   setMapCenter(newCenter);
  // };

  // const handleDropdownOptions = (value) => {
  //   setSelectedOptions(value);
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   handleSearchButton();
  // };

  // const handleSearchButton = async () => {
  //   try {
  //     const query = new URLSearchParams({
  //       "cwp_query[post_type]": "listing",
  //       "cwp_query[orderby]": "ASC",
  //       "cwp_query[s]": searchKeywordsState,
  //       "cwp_query[fc-google-address_range]": areaRange,
  //       "cwp_query[fc-google-address]": place?.address || "",
  //       "cwp_query[fc-google-address_lat]": place?.lat || "",
  //       "cwp_query[fc-google-address_lng]": place?.lng || "",
  //     }).toString();

  //     const response = await axios.get(
  //       `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`
  //     );

  //     setListingsState(response.data);

  //     if (place) {
  //       setMapCenter({ lat: place.lat, lng: place.lng });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching listings:", error);
  //   }
  // };

  // const profileData = [
  //   {
  //     id: 1,
  //     profileImg: IMAGES.DOCTOR_LIST_PROFILE,
  //     title: profileTitle,
  //     designation: "Physiotherapist",
  //     languages: languages,
  //     address: "Lahore, Pakistan",
  //     phone: "123(456) - 789",
  //     comment_status: "Yes",
  //     status: "Open",
  //   },
  //   {
  //     id: 2,
  //     profileImg: IMAGES.DOCTOR_LIST_PROFILE,
  //     title: "Doctor Jane",
  //     designation: "Dentist",
  //     languages: "English, Spanish",
  //     address: "Karachi, Pakistan",
  //     phone: "987(654) - 321",
  //     comment_status: "Close",
  //     status: "Close",
  //   },
  // ];

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
              <Form
                // onSubmit={handleFormSubmit}
                className="h-100 p-1"
              >
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
                      // onChange={setAreaRange}
                      // onChange={handleTemperatureRangeChange}
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
                        // onChange={handleSearchKeywordsChange}
                      />
                    </InputGroup>

                    <div className="ms-1">
                      <GenericButton
                        // onClick={handleSearchButton}
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
              {listingProfiles.map((profileItem) => (
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
                {listingProfiles.map((profileItem) => (
                  <ProfileCard
                    key={profileItem.id}
                    // enableSponsoredProfile
                    // columnPadding
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
