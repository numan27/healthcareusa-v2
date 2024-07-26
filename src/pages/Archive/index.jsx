import { useState, useEffect, useCallback, useRef, useContext } from "react";
import debounce from "lodash.debounce";
import { Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import {
  Box,
  GenericButton,
  Typography,
} from "../../components/GenericComponents";
import AdsSection from "../../components/Shared/AdsSection";
import RangeSlider from "./components/RangeSlider";
import ProfileCard from "../Listings/components/ProfileCard";
import { FaCircleInfo, FaLocationCrosshairs } from "react-icons/fa6";
import SearchIcon from "../../assets/SVGs/Search";
import { useLocation, useNavigate } from "react-router-dom";
import SquareMenu from "../../assets/SVGs/SquareMenu";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import axios from "axios";
import IMAGES from "../../assets/images";
import NavigateToListings from "../AdScreens/NavigateToListings";
import DropdownFilter from "./components/DropdownFilters";
import { LoaderCenter } from "../../assets/Loader";
import { FaTimes } from "react-icons/fa";
import Pagination from "../../components/PaginationComponent";
import { GroupedListingsContext } from "../../components/api/GroupedListingsContext";
import BreadCrumb from "../../components/BreadCrumb";
import MapComponent from "../Listings/components/MapComponent";

const Archive = () => {
  const { groupedListings } = useContext(GroupedListingsContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState("initial");
  const [areaRange, setAreaRange] = useState(10);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchKeywordsState, setSearchKeywordsState] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [placeState, setPlaceState] = useState(null);
  const [locationState, setLocationState] = useState("");
  const [latestQueryParams, setLatestQueryParams] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedListing, setSelectedListing] = useState("");

  console.log("specialtyOptions", specialtyOptions);
  console.log("groupedListings", groupedListings);

  const profilesPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItem, searchKeywords, place } = location.state || {};
  const fetchRequestRef = useRef(null);
  const locationPath = useLocation();

  const onLoad = useCallback((autocomplete) => {
    if (window.google) {
      autocompleteRef.current = autocomplete;
    } else {
      console.error("Google Maps JavaScript API not loaded.");
    }
  }, []);

  const autocompleteRef = useRef(null);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const placeResult = autocompleteRef.current.getPlace();
      if (placeResult.geometry) {
        const lat = placeResult.geometry.location.lat();
        const lng = placeResult.geometry.location.lng();
        const address = placeResult.formatted_address;
        setPlaceState({ lat, lng, address });
        setLocationState(address);
        setShowMap(true);
      } else {
        setPlaceState(null);
        setLocationState("");
        setShowMap(false);
      }
    }
  };

  useEffect(() => {
    if (selectedSpecialty && selectedSpecialty.length > 0) {
      setLoading(true);
      fetchData({
        searchKeywordsState,
        areaRange,
        place: placeState,
        currentPage: 0,
        specialty: selectedSpecialty.join(","),
      });
    } else {
      // Trigger initial query when specialty filter is reset
      setLoading(true);
      fetchData({
        searchKeywordsState,
        areaRange,
        place: placeState,
        currentPage: 0,
      });
    }
  }, [selectedSpecialty]);

  const handleSpecialtyChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    if (selectedValues.length === 0) {
      setSelectedSpecialty(null);
    } else {
      setSelectedSpecialty(selectedValues);
    }
  };

  useEffect(() => {
    if (selectedItem && groupedListings.length > 0) {
      setLoading(true);
      const filteredProfiles = profiles.filter((profile) =>
        profile.taxonomies.some(
          (taxonomy) =>
            taxonomy.toLowerCase() === selectedItem.name.toLowerCase()
        )
      );
      setFilteredProfiles(filteredProfiles);
      setLoading(false);

      // Extract siblings from the fetched categories/items
      const specialties = groupedListings
        .flatMap((group) => group.items)
        .filter(
          (item) =>
            item.parent === selectedItem.parent && item.id !== selectedItem.id
        )
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.name,
        }));

      setSpecialtyOptions(specialties);
    } else {
      setFilteredProfiles(profiles);
      setSpecialtyOptions([]);
    }
  }, [selectedItem, profiles, groupedListings]);

  console.log("SelectedItem:", selectedItem);

  useEffect(() => {
    if (locationPath.pathname === "/") {
      sessionStorage.removeItem("latestQueryParams");
      setPlaceState(null);
      setSearchKeywords("");
    }

    if (location.state?.reload) {
      const { category, queryParams } = location.state;
      setLoading(true);
      fetchData({
        ...queryParams,
        specialty: category || queryParams.specialty,
      });
      navigate(locationPath.pathname, { replace: true, state: {} });
    }
  }, [locationPath.pathname, location.state]);

  const handleLocationCrosshairsClick = () => {
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
          setPlaceState({ lat: latitude, lng: longitude, address });
          setLocationState(address);
        } else {
          setLocationState("Current Location");
        }
        setIsLoadingLocation(false);
      });
    }
  };

  const fetchData = useCallback(
    debounce(async (params) => {
      if (fetchRequestRef.current) {
        fetchRequestRef.current.cancel();
      }

      const source = axios.CancelToken.source();
      fetchRequestRef.current = source;

      const {
        searchKeywordsState = "",
        areaRange = 10,
        place = { address: "", lat: "", lng: "" },
        currentPage = 0,
        specialty = selectedItem ? selectedItem.name : "",
      } = params;

      setLatestQueryParams(params); // Store the latest query parameters

      const query = new URLSearchParams({
        "cwp_query[post_type]": "listing",
        "cwp_query[orderby]": "ASC",
        "cwp_query[s]": searchKeywordsState,
        "cwp_query[fc-google-address_range]": areaRange.toString(),
        "cwp_query[fc-google-address]": place?.address || "",
        "cwp_query[fc-google-address_lat]": place?.lat || "",
        "cwp_query[fc-google-address_lng]": place?.lng || "",
        "cwp_query[posts_per_page]": profilesPerPage,
        "cwp_query[paged]": currentPage + 1,
        "cwp_query[page_num]": currentPage + 1,
        "cwp_query[service]": specialty,
      }).toString();

      try {
        const response = await axios.get(
          `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`
        );

        const basicProfiles = response.data.posts;

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
          const address = addressMeta?.address;
          const lat = addressMeta?.lat || null;
          const lng = addressMeta?.lng || null;

          return {
            id: profile.id,
            profileImg:
              profile.featured_media_url || IMAGES.DOCTOR_LIST_PROFILE,
            title: profile.title.rendered,
            designation:
              profile?.cubewp_post_meta?.["cwp_field_40228862441"]?.meta_value,
            languages:
              profile?.cubewp_post_meta?.["fc-languages"]?.meta_value?.split(
                ", "
              ) || [],
            specialization:
              profile?.cubewp_post_meta?.[
                "cwp_field_136461069401"
              ]?.meta_value?.split(", ") || [],
            gender:
              profile?.cubewp_post_meta?.["cwp_field_224925973684"]?.meta_value,
            doctorPackage:
              profile?.cubewp_post_meta?.[
                "cwp_field_631649982329"
              ]?.meta_value?.split(", ") || [],
            address: address,
            lat: lat ? parseFloat(lat) : null,
            lng: lng ? parseFloat(lng) : null,
            phone: profile?.cubewp_post_meta?.["fc-phone"]?.meta_value,
            comment_status: profile.comment_status,
            status: profile.status,
            service: profile.service || [],
            taxonomies: profile.taxonomies || [],
          };
        });

        const totalProfiles = response.data.total_posts;
        setTotalPages(Math.ceil(totalProfiles / profilesPerPage));
        setTotalPosts(totalProfiles);

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
    [selectedItem]
  );

  useEffect(() => {
    if (placeState) {
      setLoadingType("location");
      setLoading(true);
      fetchData({
        searchKeywordsState,
        areaRange,
        place: placeState,
        currentPage: 0,
      });
      setShowMap(true);
    }
  }, [placeState, searchKeywordsState, areaRange, fetchData]);

  useEffect(() => {
    const savedQueryParams = sessionStorage.getItem("latestQueryParams");
    if (savedQueryParams) {
      const params = JSON.parse(savedQueryParams);
      setLatestQueryParams(params);
      fetchData(params);
      sessionStorage.removeItem("latestQueryParams");
    } else {
      setLoadingType("initial");
      setLoading(true);
      fetchData({ searchKeywordsState, currentPage });
    }
  }, []);

  useEffect(() => {
    setLoadingType("initial");
    setLoading(true);
    const initialParams = {
      searchKeywordsState: searchKeywords || "",
      areaRange,
      place: place || null,
      currentPage,
    };
    setLatestQueryParams(initialParams);
    fetchData(initialParams);
  }, []);

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

  const handleAreaRangeChange = (value) => {
    setAreaRange(value);
  };

  const handleSearchButton = () => {
    setCurrentPage(0);
    setLoadingType("search");
    setLoading(true);
    fetchData({
      searchKeywordsState,
      areaRange,
      place: placeState,
      currentPage: 0,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newParams = {
      searchKeywordsState,
      areaRange,
      place: placeState
        ? placeState
        : { address: locationState, lat: null, lng: null },
      currentPage: 0,
    };
    setLatestQueryParams(newParams);
    setCurrentPage(0);
    setLoadingType("search");
    setLoading(true);
    fetchData(newParams);
  };

  const handleResetSearch = () => {
    setSearchKeywordsState("");
    setCurrentPage(0);
    setLoadingType("search");
    setLoading(true);
    fetchData({ searchKeywordsState: "", areaRange, currentPage: 0 });
  };

  const topRef = useRef(null);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setLoading(true);
    fetchData({
      ...latestQueryParams,
      currentPage: selected,
    });

    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetLocation = () => {
    setPlaceState(null);
    setLocationState("");
    setCurrentPage(0);
    setLoadingType("initial");
    setLoading(true);
    setShowMap(false);
    const initialParams = {
      searchKeywordsState,
      areaRange,
      place: null,
      currentPage: 0,
    };
    setLatestQueryParams(initialParams);
    fetchData(initialParams);
  };

  // if (loading && loadingType === "initial") {
  //   return (
  //     <div>
  //       <NavigateToListings />
  //     </div>
  //   );
  // }

  console.log("locationState", locationState);

  const markerStyle = {
    borderRadius: "50%",
    width: "38px",
    height: "38px",
    border: "2px solid black",
  };

  const getProfileImgUrl = () => {
    return IMAGES.MALE_CIRCLE_PLACEHOLDER;
  };

  return (
    <LoadScriptNext
      googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg"
      libraries={["places"]}
    >
      <>
        <Container ref={topRef} className="min-vh-100">
          <div className="mt-4">
            <BreadCrumb
              category={selectedItem ? selectedItem.name : ""}
              listingTitle={searchKeywords}
              location={locationState}
            />
          </div>
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
                  Public Service Announcements (PSA) FDA Approves Wegovy for
                  Heart Attack Prevention. (FDA)
                </Typography>
              </Box>

              <Box
                border="1px solid #E4E4E4"
                radius="8px"
                className="custom-shadow-2 py-3 px-4 w-100"
              >
                <Form onSubmit={handleFormSubmit} className="h-100 p-1">
                  <Row className="d-flex align-items-center pt-3">
                    <Col
                      md={4}
                      className="d-flex align-items-center gap-2 pe-4 mb-md-0 mb-2"
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
                        onChange={handleAreaRangeChange}
                      />
                    </Col>
                    <Col
                      md={4}
                      className="d-flex align-items-center section-responsive-border h-100 mb-md-3 mb-2"
                    >
                      <InputGroup className="search-bar">
                        <InputGroup.Text
                          className="bg-white border-0 p-2"
                          id="basic-addon1"
                        >
                          <SquareMenu />
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Key words or company"
                          aria-label="Search Keywords"
                          aria-describedby="basic-addon1"
                          className="py-3"
                          value={searchKeywordsState}
                          onChange={handleSearchKeywordsChange}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleFormSubmit(e); // Trigger form submit on Enter key
                            }
                          }}
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
                      </InputGroup>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex align-items-center mb-md-3 mb-2"
                    >
                      <div className="d-flex align-items-center w-100">
                        {window.google && (
                          <Autocomplete
                            className="w-100"
                            onLoad={onLoad}
                            onPlaceChanged={onPlaceChanged}
                          >
                            <InputGroup className="search-bar border-search-md w-100">
                              <InputGroup.Text
                                className="bg-white border-0 p-2 cursor-pointer"
                                id="basic-addon1"
                                onClick={handleLocationCrosshairsClick}
                              >
                                <FaLocationCrosshairs
                                  color="#06312E"
                                  size={20}
                                />
                              </InputGroup.Text>
                              <Form.Control
                                placeholder="city, state or zip"
                                aria-label="Location"
                                aria-describedby="basic-addon1"
                                className="py-2"
                                value={locationState}
                                onChange={(e) =>
                                  setLocationState(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleFormSubmit(e); // Trigger form submit on Enter key
                                  }
                                }}
                              />
                              {locationState && (
                                <InputGroup.Text
                                  onClick={handleResetLocation}
                                  style={{
                                    cursor: "pointer",
                                    background: "transparent",
                                    border: "none",
                                  }}
                                >
                                  <FaTimes />
                                </InputGroup.Text>
                              )}
                              {isLoadingLocation && <LoaderCenter />}
                            </InputGroup>
                          </Autocomplete>
                        )}
                      </div>
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
                specialtyOptions={specialtyOptions}
                onSpecialtyChange={handleSpecialtyChange}
                onOptionChange={() => {
                  setLoading(true);
                  fetchData({
                    searchKeywordsState,
                    areaRange,
                    place: placeState,
                    currentPage: 0,
                  });
                }}
              />

              <div className="pt-3 mb-3">
                {loadingType === "search" && loading ? (
                  <LoaderCenter />
                ) : (
                  <div>
                    {place || selectedItem ? (
                      <Typography
                        as="p"
                        color="#7B7B7B"
                        weight="400"
                        size="16px"
                        lineHeight="26px"
                      >
                        <span className="text-dark">{totalPosts}</span> search
                        result(s)
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
                  </div>
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
                {filteredProfiles?.length > 0 ? (
                  filteredProfiles
                    ?.slice(0, 2)
                    .map((profileItem) => (
                      <ProfileCard
                        key={profileItem.id}
                        enableSponsoredProfile
                        columnPadding
                        singleProfile={profileItem}
                        searchKeywordsState={searchKeywordsState}
                        areaRange={areaRange}
                        currentPage={currentPage}
                        selectedOptions={selectedOptions}
                      />
                    ))
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
                  {filteredProfiles.map((profileItem) => (
                    <ProfileCard
                      key={profileItem.id}
                      singleProfile={profileItem}
                      searchKeywordsState={searchKeywordsState}
                      areaRange={areaRange}
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
                <MapComponent
                  filteredProfiles={filteredProfiles}
                  selectedListing={selectedListing}
                  handleMarkerClick={(profile) => {
                    setSelectedListing(profile);
                  }}
                  handleCloseInfoWindow={() => setSelectedListing(null)}
                  getProfileImgUrl={getProfileImgUrl}
                  markerStyle={markerStyle}
                />
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
              pageCount={totalPages}
              onPageChange={handlePageClick}
              currentPage={currentPage}
            />
          </div>
        </Container>
      </>
    </LoadScriptNext>
  );
};

export default Archive;
