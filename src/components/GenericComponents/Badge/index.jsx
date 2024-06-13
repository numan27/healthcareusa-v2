/* eslint-disable */
import PropTypes from "prop-types";
import styled from "styled-components";
import { GoDotFill } from "react-icons/go";

const StyledBadge = styled.div`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  border-color: ${(props) => props.borderColor || "#E4E4E4"};
  border: ${(props) => props.border} !important;
  font-weight: ${(props) => props.weight};
  // font-weight: 600 !important;
  display: inline-flex;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

function GenericBadge({
  fontSize,
  background,
  color,
  padding,
  width,
  height,
  borderRadius,
  borderColor,
  weight,
  border,
  text,
  statusText,
  className,
  onClickFunction,
}) {
  const status = statusText.toLowerCase();

  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    }
  };

  return (
    <StyledBadge
      background={background}
      color={color}
      padding={padding}
      fontSize={fontSize}
      width={width}
      weight={weight}
      height={height}
      borderRadius={borderRadius}
      borderColor={borderColor}
      border={border}
      className={className}
      onClick={handleClick}
    >
      {status === "open" && (
        <span className="d-flex align-items-center">
          <GoDotFill className="fs-5" color="#00B293" />
        </span>
      )}
      {status === "close" && (
        <span className="d-flex align-items-center">
          <GoDotFill className="fs-5" color="#E91515" />
        </span>
      )}
      {text}
    </StyledBadge>
  );
}

GenericBadge.propTypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  width: PropTypes.string,
  weight: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  border: PropTypes.bool,
  borderColor: PropTypes.string,
  textUppercase: PropTypes.bool,
  text: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
  onClickFunction: PropTypes.func,
};

GenericBadge.defaultProps = {
  background: "#2964E11A",
  color: "#14A077",
  padding: "4px 12px",
  fontSize: "14px",
  width: "",
  weight: "600",
  height: "",
  borderRadius: "40px",
  border: false,
  borderColor: "#E4E4E4",
  textUppercase: false,
  statusText: "",
};

export default GenericBadge;
