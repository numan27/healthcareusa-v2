import styled from "styled-components";
import PropTypes from "prop-types";

const BoxContainer = styled.div`
  background: ${(props) => props.background};
  box-shadow: ${(props) => props.shadow};
  border-radius: ${(props) => props.radius};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.color};
  border-style: ${(props) => props.borderStyle};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  && {
    :hover {
      background: ${(props) => props.hoverBgColor};
      border-color: ${(props) => props.hoverBorderColor};
      color: ${(props) =>
    props?.hoverTextColor ? props.hoverTextColor : "inherit"};
    }
  } 
`;

export default function Box({ children, ...props }) {
  return <BoxContainer {...props}>{children}</BoxContainer>;
}

Box.propTypes = {
  width: PropTypes.string,
  background: PropTypes.string,
  hoverBgColor: PropTypes.string,
  hoverBorderColor: PropTypes.string,
  radius: PropTypes.string,
  shadow: PropTypes.string,
  children: PropTypes.node,
  padding: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  color: PropTypes.string,
  hoverTextColor: PropTypes.string,
};

Box.defaultProps = {
  width: "fit-content",
  background: "transparent",
  hoverBgColor: "",
  radius: "0px",
  shadow: "none",
  padding: "0px",
  children: null,
  height: "",
  border: "",
  color: "",
  hoverTextColor: "",
  hoverBorderColor: "transparent",
};
