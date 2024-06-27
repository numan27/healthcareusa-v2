import axios from "axios";
import { useEffect, useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import IMAGES from "../../assets/images";
import { Box, Typography } from "../../components/GenericComponents";

const NavigateToListings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [loadingTime, setLoadingTime] = useState(100);
  const [fetchedListings, setFetchedListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const startTime = Date.now();
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

        setFetchedListings(transformedProfileData);
      } catch (error) {
        console.error("Error fetching posts or media:", error);
      } finally {
        const endTime = Date.now();
        const fetchDuration = endTime - startTime;
        setLoadingTime(fetchDuration);
      }
    };

    fetchListings();

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          navigate("/listings", {
            state: {
              ...location.state,
              adShown: true,
              listings: fetchedListings,
            },
            replace: true,
          });
          return 100;
        }
        return prevProgress + 100 / (loadingTime / 60);
      });
    }, 60); // milliseconds

    return () => clearInterval(timer);
  }, [navigate, location.state, loadingTime, fetchedListings]);

  return (
    <div className="w-100" style={{ height: "calc(100vh - 80px)" }}>
      <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
        <img
          className="ads-loading-icon"
          width={260}
          src={IMAGES.ADS_LOADING_ICON}
          alt="icon"
        />

        <div>
          <Typography
            className="mt-2"
            as="p"
            align="center"
            color="#23262F"
            weight="600"
            size="15px"
            lineHeight="27px"
            font="Plus Jakarta Sans"
          >
            One moment please while we find you the right service provider
            you...{" "}
          </Typography>
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            style={{ marginTop: "20px", width: "100%" }}
            className="ad-progress-bar"
          />
        </div>
        <Box width="450px" className="ads-square-box">
          <img
            className="mt-5 img-fluid"
            src={IMAGES.ADS_SQUARE_IMG}
            alt="Ad"
          />
        </Box>
      </Container>
    </div>
  );
};

export default NavigateToListings;
