import React, {
  createContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
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
  const [placeState, setPlaceState] = useState(null);
  const fetchRequestRef = useRef(null);
  const profilesPerPage = 10;

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance / 1.609;
  };

  const fetchData = useCallback(
    debounce(async (params) => {
      if (fetchRequestRef.current) {
        fetchRequestRef.current.cancel();
      }

      const source = axios.CancelToken.source();
      fetchRequestRef.current = source;

      const searchKeywords =
        params.searchKeywordsState || searchKeywordsState || "";

      const query = new URLSearchParams({
        "cwp_query[post_type]": "listing",
        "cwp_query[orderby]": "ASC",
        "cwp_query[s]": "",
        "cwp_query[fc-google-address_range]": params.areaRange.toString(),
        "cwp_query[fc-google-address]": params.place?.address || "",
        "cwp_query[fc-google-address_lat]": params.place?.lat || "",
        "cwp_query[fc-google-address_lng]": params.place?.lng || "",
        "cwp_query[posts_per_page]": profilesPerPage,
        "cwp_query[paged]": params.currentPage + 1,
        "cwp_query[page_num]": params.currentPage + 1,
        ...(searchKeywords && { "cwp_query[service]": searchKeywords }),
      }).toString();

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

        let filteredProfiles = sortedProfiles;

        if (searchKeywords) {
          const keywordsLower = searchKeywords.toLowerCase();
          filteredProfiles = sortedProfiles.filter(
            (profile) =>
              (profile.specialization &&
                profile.specialization.some((spec) =>
                  spec.toLowerCase().includes(keywordsLower)
                )) ||
              (profile.taxonomies &&
                profile.taxonomies.some((taxonomy) =>
                  taxonomy.toLowerCase().includes(keywordsLower)
                ))
          );
        }

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
    []
  );

  const handleSearch = (params) => {
    setCurrentPage(params.currentPage);
    setLoadingType("search");
    setLoading(true);
    fetchData(params);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setLoading(true);
    fetchData({
      searchKeywordsState,
      areaRange,
      place: placeState,
      currentPage: selected,
    });
  };
  const [activeTab, setActiveTab] = useState("Home Page");
  return (
    <ListingsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profiles,
        loading,
        loadingType,
        areaRange,
        setAreaRange,
        selectedOptions,
        setSelectedOptions,
        searchKeywordsState,
        setSearchKeywordsState,
        totalPosts,
        currentPage,
        setCurrentPage,
        totalPages,
        filteredProfiles,
        setFilteredProfiles,
        placeState,
        setPlaceState,
        handleSearch,
        handlePageClick,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsContext;
