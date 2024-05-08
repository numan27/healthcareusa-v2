import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const StyledIconButton = styled(Button)`
background: ${(props) =>
    props.background ? props.background : "#00C1B6"} !important;
  border-radius: ${(props) => props.radius}!important;
  color: ${(props) => props.color};
  border-color: ${(props) => (props.borderColor ? props.borderColor : "transparent")} !important;
  height: 48px !important;
  width: 48px !important;
  svg{
    font-size: 20px;
  }
  &:hover {
    color: ${(props) => props.color};
    background: ${(props) =>
      props.background ? props.hoverBgColor : "#00ADA2"} !important;
    svg {
      color: ${(props) => props.color};
    }
  }
`;

export default function GenericIconButton({ icon, color, borderColor, background, hoverBgColor, radius, onClick, ...props }) {
  return (
    <StyledIconButton {...props}>
      {icon}
    </StyledIconButton>
  );
}

GenericIconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  background: PropTypes.string,
  hoverBgColor: PropTypes.string,
  radius: PropTypes.string,
  onClick: PropTypes.func,
};

GenericIconButton.defaultProps = {
  color: "#fff",
  background: "#00C1B6",
  hoverBgColor: "#00ADA2",
  radius: "4px",
  borderColor: "transparent",
  onClick: () => { },
};
