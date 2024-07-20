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
const EXCLUDE_PATHS = ["archive"];

// Mapping of dynamic paths to readable labels
const PATH_LABELS = {
  blogs: "Blogs",
  "detail-blog": "Blog Details",
  listings: "LISTINGS",
};

// Styled components
const StyledBreadcrumbs = styled(Breadcrumbs)`
  color: #fff;
  transparent: 0.7;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(MUILink)`
  font-size: 16px;
  text-decoration: none;
  color: #333;
  &:hover {
    color: #000;
  }
  &:active {
    color: #000;
  }
`;

export default function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && !EXCLUDE_PATHS.includes(x));

  // Function to get dynamic labels for states and cities
  const getDynamicLabel = (value, index) => {
    if (index === 1) {
      return `State: ${value}`; // Assuming state is the second segment
    } else if (index === 2) {
      return `City: ${value}`; // Assuming city is the third segment
    }
    return value;
  };

  // Ensure "listings" is included in the path if "listing-details" is in the path
  const adjustedPathnames = pathnames.includes("listing-details")
    ? ["listings", ...pathnames]
    : pathnames;

  return (
    <div
      role="presentation"
      onClick={handleClick}
      className="position-absolute"
    >
      <Container>
        <StyledBreadcrumbs
          className="rounded-pill px-4 py-2 shadow-lg mt-3"
          aria-label="breadcrumb"
        >
          <StyledLink component={RouterLink} to="/" active={false}>
            Home
          </StyledLink>
          {adjustedPathnames.map((value, index) => {
            const last = index === adjustedPathnames.length - 1;
            const to = `/${adjustedPathnames.slice(0, index + 1).join("/")}`;

            const label = PATH_LABELS[value] || getDynamicLabel(value, index);

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
