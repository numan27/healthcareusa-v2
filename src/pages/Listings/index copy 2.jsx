import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { Container, Row, Col } from "react-bootstrap";
import { Box, Typography } from "../../components/GenericComponents";
import AdsSection from "../../components/Shared/AdsSection";
import ProfileCard from "./components/ProfileCard";
import { FaCircleInfo } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { LoadScriptNext } from "@react-google-maps/api";
import axios from "axios";
import IMAGES from "../../assets/images";
import NavigateToListings from "../AdScreens/NavigateToListings";
import DropdownFilter from "./components/DropdownFilters";
import { LoaderCenter } from "../../assets/Loader";
import Pagination from "../../components/PaginationComponent";
import BreadCrumb from "../../components/BreadCrumb";
import MapComponent from "./components/MapComponent";
import SearchFormListings from "./components/SearchFormListings";
import { calculateDistance } from "../../assets/utils";

const Listings = () => {
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
  // const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedListing, setSelectedListing] = useState("");

  const autocompleteRef = useRef(null);
  const profilesPerPage = 10;
  const location = useLocation();

  const [locationState, setLocationState] = useState(
    location.state?.place?.address || ""
  );
  const [placeState, setPlaceState] = useState(location.state?.place || null);
  const { searchKeywords, place, filteredListings } = location.state || {};
  const fetchRequestRef = useRef(null);

  // Initialize autocomplete onLoad callback

  const onLoad = useCallback((autocomplete) => {
    if (!autocompleteRef.current) {
      autocompleteRef.current = autocomplete;
      autocomplete.addListener("place_changed", onPlaceChanged);
    }
  }, []);

  // Handle place change from autocomplete

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const placeResult = autocompleteRef.current.getPlace();
      if (placeResult.geometry) {
        const lat = placeResult.geometry.location.lat();
        const lng = placeResult.geometry.location.lng();
        const address = placeResult.formatted_address;
        setPlaceState({ lat, lng, address });
        setLocationState(address);
        setCurrentPage(0);
        setLoadingType("search");
        setLoading(true);
        fetchData({
          searchKeywordsState,
          areaRange,
          place: { lat, lng, address },
          currentPage: 0,
        });
      } else {
        setPlaceState(null);
        setLocationState("");
      }
    }
  };

  useEffect(() => {
    if (location.state) {
      const {
        searchKeywords,
        place,
        filteredListings,
        currentPage,
        areaRange,
      } = location.state;
      setSearchKeywordsState(searchKeywords || "");
      setPlaceState(place || null);
      setLoading(false);
      setCurrentPage(currentPage || 0);
      setAreaRange(areaRange || 10);
      if (filteredListings && filteredListings.length > 0) {
        const profilesData = filteredListings.flatMap((group) => group.items);
        setProfiles(profilesData);
        setFilteredProfiles(profilesData);
      } else {
        fetchData({
          searchKeywordsState: searchKeywords || "",
          place,
          currentPage,
          areaRange,
        });
      }
    } else {
      const savedState = sessionStorage.getItem("listingsState");
      if (savedState) {
        const {
          searchKeywords,
          place,
          filteredListings,
          areaRange,
          currentPage,
          selectedOptions,
        } = JSON.parse(savedState);
        setSearchKeywordsState(searchKeywords || "");
        setPlaceState(place || null);
        setLoading(false);
        setAreaRange(areaRange || 10);
        setCurrentPage(currentPage || 0);
        setSelectedOptions(selectedOptions || []);
        if (filteredListings && filteredListings.length > 0) {
          const profilesData = filteredListings.flatMap((group) => group.items);
          setProfiles(profilesData);
          setFilteredProfiles(profilesData);
        }
      } else {
        setLoading(false);
        fetchData({ searchKeywordsState, areaRange, place: null, currentPage });
      }
    }
  }, [location.state]);

  // Save state to session storage whenever dependencies change

  useEffect(() => {
    const stateToSave = {
      searchKeywords: searchKeywordsState,
      place: placeState,
      filteredListings: filteredProfiles,
      areaRange: areaRange,
      currentPage: currentPage,
      selectedOptions: selectedOptions,
    };
    sessionStorage.setItem("listingsState", JSON.stringify(stateToSave));
  }, [
    searchKeywordsState,
    placeState,
    filteredProfiles,
    areaRange,
    currentPage,
    selectedOptions,
  ]);

  // Clear session storage when navigating to home

  useEffect(() => {
    if (location.pathname === "/") {
      sessionStorage.removeItem("listingsState");
    }
  }, [location.pathname]);

  // Updates SearchKeywords and Place States

  useEffect(() => {
    if (searchKeywords) {
      setSearchKeywordsState(searchKeywords);
    }
    if (place) {
      setAreaRange(10);
    }
  }, [searchKeywords, place]);

  // Fetch Data

  const fetchData = useCallback(
    debounce(async (params) => {
      if (fetchRequestRef.current) {
        fetchRequestRef.current.cancel();
      }

      const source = axios.CancelToken.source();
      fetchRequestRef.current = source;

      const searchKeywords =
        params.searchKeywordsState || searchKeywordsState || "";

      const queryParams = {
        "cwp_query[post_type]": "listing",
        "cwp_query[orderby]": "ASC",
        "cwp_query[s]": searchKeywords,
        "cwp_query[fc-google-address_range]": params.areaRange?.toString(),
        "cwp_query[fc-google-address]": params.place?.address || "",
        "cwp_query[fc-google-address_lat]": params.place?.lat || "",
        "cwp_query[fc-google-address_lng]": params.place?.lng || "",
        "cwp_query[posts_per_page]": profilesPerPage,
        "cwp_query[paged]": params.currentPage + 1,
        "cwp_query[page_num]": params.currentPage + 1,
      };

      (params.selectedOptions || selectedOptions).forEach((option) => {
        option.values.forEach((v) => {
          switch (option.label) {
            case "Specialty":
              queryParams["cwp_query[service].meta_value"] = v.value;
              break;
            case "Gender":
              queryParams[`cwp_query[cwp_field_224925973684].meta_value`] =
                v.value;
              break;
            case "Languages":
              queryParams[`cwp_query[fc-languages].meta_value`] = v.value;
              break;
            default:
              break;
          }
        });
      });

      const query = new URLSearchParams(queryParams).toString();

      try {
        const response = await axios.get(
          `https://jsappone.demowp.io/wp-json/cubewp-posts/v1/query?${query}`,
          { cancelToken: source.token }
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

        const userLat = params.place?.lat;
        const userLng = params.place?.lng;

        const transformedProfileData = detailedProfiles.map((profile) => {
          const addressMeta =
            profile?.cubewp_post_meta?.["fc-google-address"]?.meta_value || {};
          const address = addressMeta?.address;
          const lat = addressMeta?.lat || null;
          const lng = addressMeta?.lng || null;

          const distance =
            userLat && userLng && lat && lng
              ? calculateDistance(
                  userLat,
                  userLng,
                  parseFloat(lat),
                  parseFloat(lng)
                )
              : null;

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
            taxonomies: profile?.taxonomies || [],
            distance: distance,
          };
        });

        // Sort the profiles based on distance
        const sortedProfiles = transformedProfileData
          .map((profile) => ({
            ...profile,
            distance: calculateDistance(
              userLat,
              userLng,
              profile.lat,
              profile.lng
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        const totalProfiles = response.data.total_posts;
        setTotalPages(Math.ceil(totalProfiles / profilesPerPage));
        setTotalPosts(totalProfiles);

        setProfiles(sortedProfiles);
        setFilteredProfiles(sortedProfiles);

        setLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    }, 300),
    [
      searchKeywordsState,
      areaRange,
      placeState,
      profilesPerPage,
      selectedOptions,
    ]
  );

  useEffect(() => {
    if (placeState && location.state) {
      setLoading(true);
      fetchData({
        searchKeywordsState,
        areaRange,
        place: placeState,
        currentPage,
      });
    } else if (location.state) {
      setLoading(false);
    }
  }, [currentPage, placeState, location.state, fetchData]);

  useEffect(() => {
    if (filteredListings && filteredListings.length > 0) {
      const profilesData = filteredListings.flatMap((group) => group.items);
      setProfiles(profilesData);
      setFilteredProfiles(profilesData);
    } else {
      fetchData({ searchKeywords, place });
    }
  }, [filteredListings, searchKeywords, place, fetchData]);

  // Initial Data Fetch
  useEffect(() => {
    setLoadingType("initial");
    setLoading(true);
    fetchData({ searchKeywordsState, place, currentPage });
  }, []);

  useEffect(() => {
    setLoadingType("initial");
    setLoading(true);
    fetchData({ searchKeywordsState, place, currentPage });
  }, [place, currentPage, fetchData]);

  // Apply Filters

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
  }, [profiles, selectedOptions, searchKeywordsState]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    setLoadingType("search");
    setLoading(true);
    fetchData({
      searchKeywordsState,
      areaRange,
      place: autocompleteRef.current
        ? {
            lat: autocompleteRef.current.getPlace().geometry.location.lat(),
            lng: autocompleteRef.current.getPlace().geometry.location.lng(),
            address: autocompleteRef.current.getPlace().formatted_address,
          }
        : placeState,
      currentPage: 0,
    });
  };

  const handleResetSearch = () => {
    setSearchKeywordsState("");
    setCurrentPage(0);
    setLoadingType("search");
    setLoading(true);
    fetchData({ searchKeywordsState: "", areaRange, place, currentPage: 0 });
  };

  const handleResetLocation = () => {
    setPlaceState(null);
    setLocationState("");
    setCurrentPage(0);
    loadingType("search");
    setLoading(true);
    sessionStorage.removeItem("placeState");
    fetchData({
      searchKeywordsState,
      areaRange,
      place: null,
      currentPage: 0,
    }).finally(() => setLoading(false));
  };

  const topRef = useRef(null);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setLoading(true);
    fetchData({
      searchKeywordsState,
      areaRange,
      place: placeState,
      currentPage: selected,
    });
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const listingsState = {
      searchKeywords: searchKeywordsState,
      place: placeState,
      filteredListings: filteredProfiles,
      areaRange,
      currentPage: selected,
      selectedOptions,
    };
    sessionStorage.setItem("listingsState", JSON.stringify(listingsState));
  };

  useEffect(() => {
    if (placeState) {
      setLoading(true);
      setLoadingType("search");
      fetchData({
        searchKeywordsState,
        areaRange,
        place: placeState,
        currentPage,
      });
    }
  }, [currentPage, placeState, searchKeywordsState, areaRange, fetchData]);

  if (loading && loadingType === "initial") {
    return (
      <div>
        <NavigateToListings />
      </div>
    );
  }

  const markerStyle = {
    borderRadius: "50%",
    width: "38px",
    height: "38px",
    border: "2px solid black",
  };

  const extractStateAndCity = (address = "") => {
    const parts = address.split(",");
    const city = parts.length > 0 ? parts[0].trim() : "";
    const state = parts.length > 1 ? parts[1].trim() : "";
    return { state, city };
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
    <LoadScriptNext
      googleMapsApiKey="AIzaSyDjy5ZXZ1Fk-xctiZeEKIDpAaT1CEGgxlg"
      libraries={["places"]}
    >
      <>
        <Container ref={topRef} className="min-vh-100">
          <div className="mt-4">
            <BreadCrumb
              state={extractStateAndCity(placeState?.address).state}
              city={extractStateAndCity(placeState?.address).city}
            />
          </div>
          <div>
            <AdsSection margin={3} />
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
                className="custom-shadow-2 py-3 px-3 w-100"
              >
                <SearchFormListings
                  handleFormSubmit={handleFormSubmit}
                  searchKeywordsState={searchKeywordsState}
                  setSearchKeywordsState={setSearchKeywordsState}
                  handleResetSearch={handleResetSearch}
                  locationState={locationState}
                  setLocationState={setLocationState}
                  handleResetLocation={handleResetLocation}
                  // isLoadingLocation={isLoadingLocation}
                  areaRange={areaRange}
                  setAreaRange={setAreaRange}
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                />
              </Box>

              <div>
                <DropdownFilter
                  selectedOptions={selectedOptions}
                  setSelectedOptions={(options) => {
                    setSelectedOptions(options);
                    setLoading(true);
                    setLoadingType("search");
                    fetchData({
                      searchKeywordsState,
                      areaRange,
                      place: placeState,
                      currentPage,
                      selectedOptions: options,
                    });
                  }}
                  searchKeywordsState={searchKeywordsState}
                  areaRange={areaRange}
                  placeState={placeState}
                  currentPage={currentPage}
                  fetchData={fetchData}
                />
              </div>
              <div className="pt-3 mb-3">
                {loadingType === "search" && loading ? (
                  <LoaderCenter />
                ) : (
                  <div>
                    {place ? (
                      <Typography
                        as="p"
                        color="#7B7B7B"
                        weight="400"
                        size="16px"
                        lineHeight="26px"
                      >
                        <span className="text-dark">{totalPosts}</span> search
                        result(s) {searchKeywordsState && <span> for</span>}
                        <span className="fw-bold">{searchKeywordsState} </span>
                        in
                        <span className="fw-bold"> {placeState?.address} </span>
                      </Typography>
                    ) : (
                      <>
                        {filteredProfiles.length > 0 && totalPosts && (
                          <Typography
                            as="p"
                            color="#7B7B7B"
                            weight="400"
                            size="16px"
                            lineHeight="26px"
                          >
                            results{" "}
                            <span className="text-dark">{totalPosts}</span>
                          </Typography>
                        )}
                      </>
                    )}
                  </div>
                )}

                {filteredProfiles?.length > 0 && (
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
                )}
              </div>

              <div>
                {filteredProfiles?.length > 0 ? (
                  <>
                    {filteredProfiles.slice(0, 2).map((profileItem) => (
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
                    ))}

                    <div className="mb-4">
                      {filteredProfiles && (
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
                      )}
                    </div>

                    {filteredProfiles.map((profileItem) => (
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
                  </>
                ) : (
                  <>
                    {!loading && (
                      <Typography size="24px" weight="600">
                        No profiles found
                      </Typography>
                    )}
                  </>
                )}
              </div>
              {filteredProfiles.length > 9 && (
                <div className="d-flex justify-content-start mt-5">
                  <Pagination
                    pageCount={totalPages}
                    onPageChange={handlePageClick}
                    currentPage={currentPage}
                  />
                </div>
              )}
              <AdsSection margin={3} padding={0} />
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
                  handleMarkerClick={handleMarkerClick}
                  handleCloseInfoWindow={handleCloseInfoWindow}
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
        </Container>
      </>
    </LoadScriptNext>
  );
};

export default Listings;
