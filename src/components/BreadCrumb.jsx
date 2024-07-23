import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as MUILink } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";
import { Container } from "react-bootstrap";

// Styled components
const StyledBreadcrumbs = styled(Breadcrumbs)`
  height: 24px;
`;

const HomeLink = styled(MUILink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #667085;
  &:hover {
    color: #00c1b6 !important;
  }
  &:active {
    color: #000;
  }
`;

const StyledLink = styled(MUILink)`
  font-size: 14px !important;
  text-decoration: none !important;
  color: #667085 !important;
  text-transform: capitalize !important;
  &:hover {
    color: #00c1b6 !important;
    text-decoration: underline !important;
  }
  &:active {
    color: #00c1b6;
  }
  &[aria-current="page"] {
    color: #00c1b6 !important;
    pointer-events: none;
  }
`;

const HomeIcon = styled(FaHome)`
  color: #667085;
  &:hover {
    color: #00c1b6;
  }
`;

const NonClickableText = styled.span`
  font-size: 14px;
  color: #667085;
`;

export default function BreadCrumb({
  state,
  city,
  listingTitle,
  category,
  location,
}) {
  const navigate = useNavigate();

  const handleStateCityClick = () => {
    if (state && city) {
      navigate(`/listings?state=${state}&city=${city}`);
    }
  };

  const handleCategoryClick = () => {
    let categorySlug = category;
    if (Array.isArray(category) && category.length > 0) {
      categorySlug = category[0];
    }

    if (typeof categorySlug === "string") {
      const slug = categorySlug.toLowerCase().replace(/\s+/g, "-");
      navigate(`/archive/${slug}`, { state: { reload: true, category: slug } });
    } else {
      console.error("Category is not a string:", category);
    }
  };

  // Check for undefined props and set default values if necessary
  const displayState = state || "";
  const displayCity = city || "";
  const displayListingTitle = listingTitle || "";
  const displayCategory = category || "";
  const displayLocation = location || "";

  return (
    <div role="presentation">
      <Container>
        <StyledBreadcrumbs
          separator={<HiOutlineChevronRight />}
          className="rounded-pill py-2 d-flex align-items-center"
          aria-label="breadcrumb"
        >
          <HomeLink component={RouterLink} to="/" active={false}>
            <HomeIcon size="24px" />
          </HomeLink>

          {displayState && displayCity && (
            displayListingTitle ? (
              <StyledLink
                className="cursor-pointer"
                onClick={handleStateCityClick}
                active={false}
              >
                {displayState}, {displayCity}
              </StyledLink>
            ) : (
              <NonClickableText>
                {displayState}, {displayCity}
              </NonClickableText>
            )
          )}

          {displayCategory && !window.location.pathname.includes("/archive") && (
            <StyledLink
              className="cursor-pointer"
              onClick={handleCategoryClick}
              active={false}
            >
              {displayCategory}
            </StyledLink>
          )}

          {displayCategory && window.location.pathname.includes("/archive") && (
            <NonClickableText>{displayCategory}</NonClickableText>
          )}

          {displayLocation && (
            <NonClickableText>{displayLocation}</NonClickableText>
          )}

          {displayListingTitle && (
            <StyledLink className="text-capitalize" aria-current="page">
              {displayListingTitle}
            </StyledLink>
          )}
        </StyledBreadcrumbs>
      </Container>
    </div>
  );
}
