/*eslint-disable*/
import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";

const StyledBadge = styled.div`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  font-weight: 600 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  &:hover svg {
    color: #000 !important;
  }
  background: none;
  border: none;
  cursor: pointer;
  color: red;
  margin-left: 5px;
`;

function GenericBadge({
  fontSize,
  background,
  color,
  padding,
  width,
  height,
  borderRadius,
  text,
  showRemoveButton,
  removeIcon,
  className,
  onClickFunction,
}) {
  const [isRemoved, setRemoved] = useState(false);

  const handleRemove = () => {
    setRemoved(true);
  };

  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    }
  };

  return isRemoved ? null : (
    <StyledBadge
      background={background}
      color={color}
      padding={padding}
      fontSize={fontSize}
      width={width}
      height={height}
      borderRadius={borderRadius}
      className={className}
      onClick={handleClick}
    >
      {text}
      {showRemoveButton && (
        <RemoveButton onClick={handleRemove}>
          {removeIcon ? (
            removeIcon
          ) : (
            <RxCross2 className="fs-5" color="#DADADA" />
          )}
        </RemoveButton>
      )}
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
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  text: PropTypes.string.isRequired,
  showRemoveButton: PropTypes.bool,
  removeIcon: PropTypes.element,
  onClickFunction: PropTypes.func,
};

GenericBadge.defaultProps = {
  background: "#2964E11A",
  color: "#14A077",
  padding: "4px 12px",
  fontSize: "14px",
  width: "",
  height: "",
  borderRadius: "40px",
  showRemoveButton: false,
  removeIcon: null,
};

export default GenericBadge;
