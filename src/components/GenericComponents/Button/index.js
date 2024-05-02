import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const getAnimationStyle = (props) => {
  if (props.animation) {
    return css`
      animation: ${hoverAnimation} 0.3s ease-in-out;
    `;
  }
  return null;
};

const StyledButton = styled(Button)`
  background: ${(props) =>
    props.background ? props.background : "transparent"} !important;
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius}!important;
  border: ${(props) => props.border} !important;
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  font-size: ${(props) => props.size};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.gap};
  color: ${(props) => props.color};
  border-color: ${(props) => props.borderColor} !important;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-weight: ${(props) => props.weight};
  &:hover {
    color: ${(props) => props.hoverColor} !important;
    background: ${(props) => props.hoverBgColor} !important;
    border-color: ${(props) => props.hoverBorderColor} !important;
    box-shadow: ${(props) => props.hoverBoxBackground};
    ${getAnimationStyle}
  }
  &:active {
    color: ${(props) => props.activeColor}!important;
    box-shadow: ${(props) => props.activeBoxBackground};
  }
  &:focus {
    color: ${(props) => props.focusColor}!important;
    box-shadow: ${(props) => props.focusBoxBackground};
  }
`;

export default function GenericButton({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

GenericButton.propTypes = {
  hoverBgColor: PropTypes.string,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  borderColor: PropTypes.string,
  background: PropTypes.string,
  radius: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  weight: PropTypes.string,
  size: PropTypes.string,
  border: PropTypes.string,
  gap: PropTypes.string,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

GenericButton.defaultProps = {
  hoverBgColor: "#4bc5bd",
  color: "#fff",
  hoverColor: "",
  background: "#50D1C9",
  radius: "4px",
  width: "",
  padding: "8px 16px",
  borderColor: "#50D1C9",
  weight: "600",
  size: "14px",
  border: "",
  height: "40px",
  gap: "10px",
  boxShadow: "",
  children: null,
  onClick: () => { },
};
