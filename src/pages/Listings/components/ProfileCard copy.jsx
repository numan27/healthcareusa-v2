import React from "react";
import { Box, Typography } from "../../../components/GenericComponents";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";

const ProfileCard = ({
  enableSponsoredProfile,
  columnPadding,
  singleProfile,
  searchKeywordsState,
  areaRange,
  place,
  currentPage,
  selectedOptions,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!singleProfile) {
    return null;
  }

  const {
    profileImg,
    title,
    designation,
    languages,
    address,
    phone,
    comment_status,
    status,
    id,
  } = singleProfile;

  const handleNavigate = (event, id) => {
    event.preventDefault();
    const { search } = location;
    navigate(`/listing-details/${id}${search}`, {
      state: {
        fromListingsPage: true,
        searchParams: search,
        searchKeywordsState,
        areaRange,
        place,
        currentPage,
        selectedOptions,
      },
    });
  };

  return (
    <div>
      <Box
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
              <img className="img-fluid" src={profileImg} alt="Profile" />
            </Col>
          )}
          <Col
            className={classNames(
              "d-flex flex-column justify-content-between",
              { "ps-1": columnPadding }
            )}
          >
            <div className="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
              <div>
                <Link
                  className="text-decoration-none"
                  onClick={(event) => handleNavigate(event, id)}
                >
                  <Typography
                    as="h2"
                    color="#23262F"
                    weight="700"
                    size="24px"
                    lineHeight="36px"
                  >
                    {title || "No Title"}
                  </Typography>
                </Link>
                {/* Remaining profile details */}
              </div>
            </div>
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default ProfileCard;
