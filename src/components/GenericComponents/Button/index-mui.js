import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledButton = styled(Button)`
  background-color: ${(props) => props.background || "#50D1C9"};
  color: ${(props) => props.color || "#fff"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.radius || "4px"};
  padding: ${(props) => props.padding || "8px 16px"};
  font-size: ${(props) => props.size || "14px"};
  font-weight: ${(props) => props.weight || "600"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  &:hover {
    background-color: ${(props) => props.hoverBgColor || "#4bc5bd"};
  }
`;

const CustomButton = ({ children, ...props }) => {
  return <StyledButton className="d-flex align-items-center justify-content-center gap-2" {...props}>{children}</StyledButton>;
};

CustomButton.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  radius: PropTypes.string,
  padding: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  hoverBgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CustomButton;
