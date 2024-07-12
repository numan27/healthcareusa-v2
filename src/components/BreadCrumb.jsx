import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as MUILink } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const handleClick = (event) => {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
};

// Paths to exclude from breadcrumbs
const EXCLUDE_PATHS = ["listing-details", "archive"];

// Mapping of dynamic paths to readable labels
const PATH_LABELS = {
  blogs: "Blogs",
  "detail-blog": "Blog Details",
  listings: "LISTINGS", // Added listings
};

// Styled components
const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin: 16px 0;
  color: #fff;
  // background-color: #00c1b6;
  transparent: 0.7;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(MUILink)`
  font-size: 16px;
  text-decoration: none;
  color: #333;
  &:hover {
    color: #00c1b6;
  }
  &:active {
    color: #00c1b6;
  }
`;

export default function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && !EXCLUDE_PATHS.includes(x));

  return (
    <div
      role="presentation"
      onClick={handleClick}
      className="position-absolute mt-2"
    >
      <Container>
        <StyledBreadcrumbs
          className="rounded-pill px-4 py-2 shadow-lg"
          aria-label="breadcrumb"
        >
          <StyledLink component={RouterLink} to="/" active={false}>
            Home
          </StyledLink>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            const label = PATH_LABELS[value] || value;

            return last ? (
              <StyledLink active={true} aria-current="page" key={to}>
                {label}
              </StyledLink>
            ) : (
              <StyledLink
                component={RouterLink}
                to={to}
                key={to}
                active={false}
              >
                {label}
              </StyledLink>
            );
          })}
        </StyledBreadcrumbs>
      </Container>
    </div>
  );
}
