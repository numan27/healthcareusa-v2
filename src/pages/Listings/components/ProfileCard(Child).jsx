import React from "react";
import { Suspense } from "react";
import {
  Box,
  GenericBadge,
  GenericButton,
  Typography,
} from "../../../components/GenericComponents";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCenter } from "../../../assets/Loader";
import PhoneCircleIcon from "../../../assets/SVGs/PhoneCircle";
import MapIcon from "../../../assets/SVGs/Map";
import CallIcon from "../../../assets/SVGs/Call";
import InternetIcon from "../../../assets/SVGs/Internet";
import DoctorLocationIcon from "../../../assets/SVGs/DoctorLocation";
import IMAGES from "../../../assets/images";
import { GoDotFill } from "react-icons/go";

const ProfileCard = ({
  enableSponsoredProfile,
  columnPadding,
  listingProfiles,
  loading,
  // PROFILE_IMG,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (event, id) => {
    event.preventDefault();
    navigate(`/listing-details/${id}`);
  };

  if (loading) {
    return <LoaderCenter />;
  }

  console.warn("listingProfiles", listingProfiles);

  return (
    <div>
      <Suspense fallback={<LoaderCenter />}>
        {listingProfiles.map((profile, index) => {
          const PROFILE_IMG = profile.featured_media?.source_url || "";

          return (
            <Box
              key={index}
              padding="16px"
              width="100%"
              className="custom-border rounded position-relative mb-4"
            >
              <Row>
                {enableSponsoredProfile && (
                  <Col
                    lg={3}
                    md={6}
                    className="d-flex justify-content-center mx-auto mb-3 mb-lg-0 pt-md-0 pt-4"
                  >
                    <img
                      className="img-fluid"
                      src={PROFILE_IMG}
                      alt="Profile Image"
                    />
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
                        onClick={(event) => handleNavigate(event, profile.id)}
                      >
                        <Typography
                          as="h2"
                          color="#23262F"
                          weight="700"
                          size="24px"
                          lineHeight="36px"
                        >
                          {profile.title.rendered || "No Title"}
                        </Typography>
                      </Link>
                      {enableSponsoredProfile ? (
                        <div className="d-flex gap-2">
                          <GenericBadge
                            text={
                              profile.cubewp_post_meta["cwp_field_40228862441"]
                                .meta_value || ""
                            }
                            fontSize="12px"
                            weight="700"
                            color="#64666C"
                            background="#F0F0F0"
                            borderColor="transparent"
                          />
                          <GenericBadge
                            text={
                              profile.cubewp_post_meta["fc-languages"]
                                .meta_value || ""
                            }
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
                            {profile.cubewp_post_meta["cwp_field_40228862441"]
                              .meta_value || ""}
                          </Typography>
                          <Typography
                            className="text-uppercase"
                            as="label"
                            color="#64666C"
                            weight="500"
                            size="14px"
                            lineHeight="16px"
                          >
                            {profile.cubewp_post_meta["fc-languages"]
                              .meta_value || ""}
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
                            {profile.cubewp_post_meta["fc-google-address"]
                              ?.meta_value?.address || ""}
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
                          {profile.cubewp_post_meta["fc-phone"].meta_value ||
                            ""}
                          {/* "Phone" */}
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
                          profile.comment_status === "Close"
                            ? "#23262F"
                            : "#00C1B6"
                        }
                        hoverBgColor={
                          profile.comment_status === "Close"
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

              {enableSponsoredProfile && (
                <div
                  style={{ top: "20px", right: "20px" }}
                  className="position-absolute d-flex align-items-center gap-2 profile-status"
                >
                  <GoDotFill
                    color={profile.status === "Close" ? "#E91515" : "#00C1B6"}
                    size={16}
                  />
                  <Typography
                    as="span"
                    color={profile.status === "Close" ? "#E91515" : "#00C1B6"}
                    weight="700"
                    size="16px"
                    lineHeight="24px"
                  >
                    {profile.status === "Close" ? "CLOSED" : "OPEN"}
                  </Typography>
                </div>
              )}
            </Box>
          );
        })}
      </Suspense>
    </div>
  );
};

export default ProfileCard;
