import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import {
  Box,
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
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import axios from "axios";
import IMAGES from "../../assets/images";
import NavigateToListings from "../AdScreens/NavigateToListings";
import DropdownFilter from "./components/DropdownFilters";
import { LoaderCenter } from "../../assets/Loader";
import { FaTimes } from "react-icons/fa";
import Pagination from "../../components/PaginationComponent";

const Listings = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState("initial");
  const [areaRange, setAreaRange] = useState(10);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchKeywordsState, setSearchKeywordsState] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Changed to 0-based index for ReactPaginate
  const [totalPages, setTotalPages] = useState(1);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const profilesPerPage = 10; // Displaying 10 profiles per page

  const location = useLocation();
  const { searchKeywords, place } = location.state || {};
  const fetchRequestRef = useRef(null);

  useEffect(() => {
    if (location.state?.fromListingsPage) {
      setSearchKeywordsState(location.state.searchKeywordsState);
      setAreaRange(location.state.areaRange);
      setSelectedOptions(location.state.selectedOptions);
      setCurrentPage(location.state.currentPage);
      setProfiles(location.state.profiles);
      setFilteredProfiles(location.state.filteredProfiles);
      setLoading(false);
    } else {
      setLoadingType("initial");
      setLoading(true);
      fetchData({ searchKeywordsState, areaRange, place, currentPage });
    }
  }, [location.state]);

  useEffect(() => {
    if (searchKeywords) {
      setSearchKeywordsState(searchKeywords);
    }
    if (place) {
      setAreaRange(10);
    }
  }, [searchKeywords, place]);

  const fetchData = useCallback(
    debounce(async (params) => {
      if (fetchRequestRef.current) {
        fetchRequestRef.current.cancel();
      }

      const source = axios.CancelToken.source();
      fetchRequestRef.current = source;

      const query = new URLSearchParams({
        "cwp_query[post_type]": "listing",
        "cwp_query[orderby]": "ASC",
        "cwp_query[s]": params.searchKeywordsState,
        "cwp_query[fc-google-address_range]": params.areaRange.toString(),
        "cwp_query[fc-google-address]": params.place?.address || "",
        "cwp_query[fc-google-address_lat]": params.place?.lat || "",
        "cwp_query[fc-google-address_lng]": params.place?.lng || "",
        "cwp_query[posts_per_page]": 100, // Fetch 100 profiles per request
        "cwp_query[paged]": params.currentPage + 1, // Adjust for 1-based page index in API
      }).toString();

      try {
        const response = await axios.get(
          `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`,
          { cancelToken: source.token }
        );

        const basicProfiles = response.data;

        if (!Array.isArray(basicProfiles)) {
          throw new Error("API response is not an array");
        }

        const detailedProfilesPromises = basicProfiles.map(async (profile) => {
          const detailedResponse = await axios.get(
            `https://jsappone.demowp.io/wp-json/wp/v2/listing/${profile.ID}`
          );
          const detailedProfile = detailedResponse.data;

          if (detailedProfile.featured_media) {
            try {
              const mediaResponse = await axios.get(
                `https://jsappone.demowp.io/wp-json/wp/v2/media/${detailedProfile.featured_media}`
              );
              detailedProfile.featured_media_url =
                mediaResponse.data.source_url;
            } catch (error) {
              console.error("Error fetching media:", error);
              detailedProfile.featured_media_url = null;
            }
          }

          return detailedProfile;
        });

        const detailedProfiles = await Promise.all(detailedProfilesPromises);

        const transformedProfileData = detailedProfiles.map((profile) => {
          const addressMeta =
            profile?.cubewp_post_meta?.["fc-google-address"]?.meta_value || {};
          const address = addressMeta?.address || "N/A";
          const lat = addressMeta?.lat || null;
          const lng = addressMeta?.lng || null;

          return {
            id: profile.id,
            profileImg:
              profile.featured_media_url || IMAGES.DOCTOR_LIST_PROFILE,
            title: profile.title.rendered,
            designation:
              profile?.cubewp_post_meta?.["cwp_field_40228862441"]
                ?.meta_value || "N/A",
            languages:
              profile?.cubewp_post_meta?.["fc-languages"]?.meta_value?.split(
                ", "
              ) || [],
            specialization:
              profile?.cubewp_post_meta?.[
                "cwp_field_136461069401"
              ]?.meta_value?.split(", ") || [],
            gender:
              profile?.cubewp_post_meta?.["cwp_field_224925973684"]
                ?.meta_value || "N/A",
            doctorPackage:
              profile?.cubewp_post_meta?.[
                "cwp_field_631649982329"
              ]?.meta_value?.split(", ") || [],
            address: address,
            lat: lat ? parseFloat(lat) : null,
            lng: lng ? parseFloat(lng) : null,
            phone: profile?.cubewp_post_meta?.["fc-phone"]?.meta_value || "N/A",
            comment_status: profile.comment_status || "N/A",
            status: profile.status || "N/A",
          };
        });

        const totalProfiles = parseInt(response.headers["x-wp-total"], 10);
        setTotalPages(Math.ceil(totalProfiles / profilesPerPage)); // Total pages based on 10 profiles per page

        setProfiles(transformedProfileData);
        setFilteredProfiles(transformedProfileData);
        setLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    }, 300),
    []
  );

  useEffect(() => {
    setLoadingType("initial");
    setLoading(true);
    fetchData({ searchKeywordsState, place, currentPage });
  }, []);

  useEffect(() => {
    setLoadingType("initial");
    fetchData({ searchKeywordsState, areaRange, place, currentPage });
  }, [areaRange, place, currentPage, fetchData]);

  const center = {
    lat: place?.lat || 0,
    lng: place?.lng || 0,
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = profiles;

      selectedOptions.forEach((filter) => {
        filtered = filtered.filter((profile) => {
          const filterValues = filter.values.map((selected) =>
            selected.value.toLowerCase()
          );

          switch (filter.label.toLowerCase()) {
            case "languages":
              return profile.languages.some((language) =>
                filterValues.includes(language.toLowerCase())
              );
            case "gender":
              return filterValues.includes(profile.gender.toLowerCase());
            case "specialization":
              return profile.specialization.some((specialty) =>
                filterValues.includes(specialty.toLowerCase())
              );
            default:
              return true;
          }
        });
      });

      setFilteredProfiles(filtered);
    };

    applyFilters();
  }, [profiles, selectedOptions]);

  const handleSearchKeywordsChange = (e) => {
    setSearchKeywordsState(e.target.value);
  };

  const handleSearchButton = () => {
    setCurrentPage(0);
    setLoadingType("search");
    setLoading(true);
    fetchData({ searchKeywordsState, areaRange, place, currentPage: 0 });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    setLoadingType("search");
    setLoading(true);
    fetchData({ searchKeywordsState, areaRange, place, currentPage: 0 });
  };

  const handleResetSearch = () => {
    setSearchKeywordsState("");
    setCurrentPage(0);
    setLoadingType("search");
    setLoading(true);
    fetchData({ searchKeywordsState: "", areaRange, place, currentPage: 0 });
  };

  const topRef = useRef(null);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setLoading(false);
    fetchData({ searchKeywordsState, areaRange, place, currentPage: selected });

    // Scroll smoothly to the top of the container on page change
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading && loadingType === "initial") {
    return (
      <div>
        <NavigateToListings />
      </div>
    );
  }

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

  const pageCount = Math.ceil(filteredProfiles.length / profilesPerPage);

  return (
    <AppLayout>
      <Container ref={topRef} className="min-vh-100">
        <div>
          <AdsSection margin={4} />
        </div>

        <Row>
          <Col lg={9}>
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
                      step={1}
                      value={areaRange}
                      onChange={(value) => setAreaRange(value)}
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
                      {searchKeywordsState && (
                        <InputGroup.Text
                          onClick={handleResetSearch}
                          style={{
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                          }}
                        >
                          <FaTimes />
                        </InputGroup.Text>
                      )}
                      {loadingType === "search" && loading && <LoaderCenter />}
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

            <DropdownFilter
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
            />

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
                  search result{" "}
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
              {filteredProfiles.length > 0 ? (
                filteredProfiles.slice(0, 2).map(
                  (
                    profileItem // Render only first 2 profiles
                  ) => (
                    <ProfileCard
                      key={profileItem.id}
                      enableSponsoredProfile
                      columnPadding
                      singleProfile={profileItem}
                      searchKeywordsState={searchKeywordsState}
                      areaRange={areaRange}
                      place={place}
                      currentPage={currentPage}
                      selectedOptions={selectedOptions}
                    />
                  )
                )
              ) : (
                <Typography size="24px" weight="600">
                  No profiles found
                </Typography>
              )}
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
                {filteredProfiles
                  .slice(
                    currentPage * profilesPerPage,
                    (currentPage + 1) * profilesPerPage
                  )
                  .map((profileItem) => (
                    <ProfileCard
                      key={profileItem.id}
                      singleProfile={profileItem}
                      searchKeywordsState={searchKeywordsState}
                      areaRange={areaRange}
                      place={place}
                      currentPage={currentPage}
                      selectedOptions={selectedOptions}
                    />
                  ))}
              </div>
            </div>
          </Col>

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
              {!loading && (
                <LoadScriptNext googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg">
                  <GoogleMap
                    className="rounded-3"
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={place ? 10 : 2}
                  >
                    {filteredProfiles.map(
                      (profile) =>
                        profile.lat &&
                        profile.lng && (
                          <Marker
                            key={profile.id}
                            position={{
                              lat: profile.lat,
                              lng: profile.lng,
                            }}
                          />
                        )
                    )}
                  </GoogleMap>
                </LoadScriptNext>
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

        <div className="d-flex justify-content-end mt-5">
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageClick}
            currentPage={currentPage}
            filteredProfiles={filteredProfiles}
          />
        </div>
      </Container>
    </AppLayout>
  );
};

export default Listings;
