import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  GenericBadge,
  GenericButton,
  Typography,
} from "../../../components/GenericComponents";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import CallIcon from "../../../assets/SVGs/Call";
import MapIcon from "../../../assets/SVGs/Map";
import InternetIcon from "../../../assets/SVGs/Internet";
import DoctorLocationIcon from "../../../assets/SVGs/DoctorLocation";
import PhoneCircleIcon from "../../../assets/SVGs/PhoneCircle";
import axios from "axios";
// import axios from "../../../assets/axios";
import IMAGES from "../../../assets/images";
import { LoaderCenter } from "../../../assets/Loader";

const ProfileCard = ({
  enableSponsoredProfile,
  columnPadding,
  setProfileLength,
}) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [mediaUrls, setMediaUrls] = useState({});
  const [loading, setLoading] = useState(true);

  const handleNavigate = (event, id) => {
    event.preventDefault();
    navigate(`/listing-details/${id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const url = "https://jsappone.demowp.io/wp-json/wp/v2/listing";
      try {
        const response = await axios.get(url);
        setProfile(response.data);
        // Fetch media URLs
        const mediaIds = response.data
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
      } catch (error) {
        console.error("Error fetching posts or media:", error);
      } finally {
        setLoading(false);
      }
    };
    setProfileLength(profile.length);

    fetchPosts();
  }, []);

  console.warn("profile", profile);

  return (
    <>
      {profile.map((data) => {
        const cubewpPostMeta = data.cubewp_post_meta || {};
        const googleAddress =
          cubewpPostMeta["fc-google-address"]?.meta_value || {};
        const phone = cubewpPostMeta["fc-phone"]?.meta_value || "";
        const languages = cubewpPostMeta["fc-languages"]?.meta_value || "";
        const designation =
          cubewpPostMeta["cwp_field_40228862441"]?.meta_value || "";
        const mediaUrl = mediaUrls[data.featured_media] || "";

        return (
          <Box
            key={data.id}
            padding="16px"
            width="100%"
            className="custom-border rounded position-relative mb-4"
          >
            <Suspense fallback={<LoaderCenter />}>
              {loading ? (
                <LoaderCenter />
              ) : (
                <Row>
                  {enableSponsoredProfile && mediaUrl && (
                    <Col
                      lg={3}
                      md={6}
                      className="d-flex justify-content-center mx-auto mb-3 mb-lg-0 pt-md-0 pt-4"
                    >
                      <img className="img-fluid" src={mediaUrl} alt="" />
                    </Col>
                  )}

                  <Col
                    className={`d-flex flex-column justify-content-between ${
                      columnPadding ? "ps-1" : ""
                    }`}
                  >
                    <div className="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
                      <div>
                        <Link
                          className="text-decoration-none"
                          onClick={(event) => handleNavigate(event, data.id)}
                        >
                          <Typography
                            as="h2"
                            color="#23262F"
                            weight="700"
                            size="24px"
                            lineHeight="36px"
                          >
                            {data.title.rendered}
                          </Typography>
                        </Link>
                        {enableSponsoredProfile ? (
                          <div className="d-flex gap-2">
                            <GenericBadge
                              text={designation}
                              fontSize="12px"
                              weight="700"
                              color="#64666C"
                              background="#F0F0F0"
                              borderColor="transparent"
                            />
                            <GenericBadge
                              text={languages}
                              fontSize="12px"
                              weight="500"
                              color="#64666C"
                              borderColor="#E4E4E4"
                              background="#fff"
                              className="border"
                            />
                          </div>
                        ) : (
                          <div className="d-flex align-items-center gap-2">
                            <Typography
                              style={{ borderRight: "1.5px solid #64666C" }}
                              className="text-uppercase pe-2"
                              as="label"
                              color="#64666C"
                              weight="500"
                              size="14px"
                              lineHeight="16px"
                            >
                              {designation}
                            </Typography>
                            <Typography
                              className="text-uppercase"
                              as="label"
                              color="#64666C"
                              weight="500"
                              size="14px"
                              lineHeight="16px"
                            >
                              {languages}
                            </Typography>
                          </div>
                        )}

                        <div className="mt-3 d-flex align-items-center gap-2">
                          <Box
                            width="65px"
                            height="65px"
                            className="custom-border rounded d-flex flex-column align-items-center justify-content-center "
                          >
                            <DoctorLocationIcon />
                            <Typography
                              as="span"
                              color="#23262F"
                              weight="700"
                              size="12px"
                              lineHeight="15px"
                            >
                              0.3 ml
                            </Typography>
                          </Box>

                          <Box width="140px" className="">
                            <Typography
                              as="span"
                              color="#23262F"
                              weight="500"
                              size="14px"
                              lineHeight="18px"
                            >
                              {googleAddress.address}
                            </Typography>
                          </Box>
                        </div>

                        <Link
                          to="#"
                          className="d-flex align-items-center gap-2 mt-3 link"
                        >
                          <PhoneCircleIcon />
                          <Typography
                            className="mb-0"
                            as="h5"
                            color="#23262F"
                            weight="700"
                            size="16px"
                            lineHeight="24px"
                          >
                            {phone}
                          </Typography>
                        </Link>
                      </div>
                      {enableSponsoredProfile && (
                        <img
                          className="mt-4"
                          width={100}
                          src={IMAGES.PROFILE_COMPANY_LOGO}
                          alt=""
                        />
                      )}
                    </div>

                    {enableSponsoredProfile && (
                      <div className="d-flex align-items-end flex-wrap flex-sm-nowrap gap-2 mt-2xl-0 mt-3">
                        <GenericButton
                          borderColor="transparent"
                          background={
                            data.comment_status === "Close"
                              ? "#23262F"
                              : "#00C1B6"
                          }
                          hoverBgColor={
                            data.comment_status === "Close"
                              ? "#23262F"
                              : "#00ADA2"
                          }
                          gap="15px"
                          height="46px"
                          width="100%"
                          className=""
                        >
                          <CallIcon />
                          Call
                        </GenericButton>

                        <GenericButton
                          borderColor="transparent"
                          hoverBgColor="#e3e3e3"
                          hoverColor="#23262F"
                          color="#23262F"
                          background="#F3F3F3"
                          height="46px"
                          width="100%"
                          className=""
                        >
                          <MapIcon />
                          Map
                        </GenericButton>

                        <GenericButton
                          hoverBgColor="#e3e3e3"
                          borderColor="transparent"
                          hoverColor="#23262F"
                          color="#23262F"
                          background="#F3F3F3"
                          height="46px"
                          width="100%"
                          className=""
                        >
                          <InternetIcon />
                          Website
                        </GenericButton>
                      </div>
                    )}
                  </Col>
                </Row>
              )}
            </Suspense>
            {enableSponsoredProfile && (
              <div
                style={{ top: "20px", right: "20px" }}
                className="position-absolute d-flex align-items-center gap-2 profile-status"
              >
                <GoDotFill
                  color={data.status === "Close" ? "#E91515" : "#00B293"}
                  size="20px"
                />
                <Typography
                  as="p"
                  className="mb-0 text-capitalize"
                  color="#23262F"
                  size="14px"
                  lineHeight="19px"
                  weight="500"
                >
                  {data.comment_status}
                </Typography>
              </div>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default ProfileCard;
