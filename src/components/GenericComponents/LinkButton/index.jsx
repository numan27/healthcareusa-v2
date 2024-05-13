import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const StyledIconButton = styled(Button)`
background: ${(props) =>
    props.background ? props.background : "transparent"} !important;
  border-radius: ${(props) => props.radius}!important;
  color: ${(props) => props.color ? props.color : "#23262F"};
  border-color: ${(props) => (props.borderColor ? props.borderColor : "transparent")} !important;
  font-weight: 600;
  font-size: 14px;
  font-family: Plus Jakarta Sans;
  // height: 48px !important;
  // width: 48px !important;
  // svg{
  //   font-size: 20px;
  // }
  &:hover {
    color: ${(props) => props.color};
    background: ${(props) =>
    props.background ? props.hoverBgColor : "transparent"} !important;
      text-decoration: underline;
    // svg {
    //   color: ${(props) => props.color};
    // }
  }
`;

export default function LinkButton({ text, color, borderColor, background, hoverBgColor, radius, onClick, ...props }) {
  return (
    <StyledIconButton {...props}>
      {text}
    </StyledIconButton>
  );
}

LinkButton.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  background: PropTypes.string,
  hoverBgColor: PropTypes.string,
  radius: PropTypes.string,
  onClick: PropTypes.func,
};

LinkButton.defaultProps = {
  color: "#23262F",
  background: "transparent",
  hoverBgColor: "transparent",
  radius: "4px",
  borderColor: "transparent",
  onClick: () => { },
};
