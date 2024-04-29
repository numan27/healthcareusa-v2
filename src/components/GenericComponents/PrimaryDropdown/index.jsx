import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";

const MainDropdownStyle = styled.div`
  .dropdown-toggle {
    background-color: #735ad9 !important;
    // color: #fff !important;
    color: ${(props) => (props.color ? props.color : "#fff")};
    padding: ${(props) => (props.padding ? props.padding : "11px 26px")};
    height: ${(props) => (props.height ? props.height : "50px")}!important;
    font-size: ${(props) => (props.fontSize ? props.fontSize : "18px")}!important;
    font-weight: 500;
    // border-color: #735ad9 !important;
    border-color: ${(props) => (props.width ? props.borderColor : "#735ad9")};
    width: ${(props) => (props.width ? props.width : "150px")} !important;
    background-color: ${(props) =>
      props.background ? props.background : "#735AD9"} !important;
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : "50px"} !important;
  }
  .dropdown-menu {
    background-color: #f1f5f8 !important;
    width: 100% !important;
  }
  .dropdown-menu .dropdown-item:nth-last-child(1) {
    border-bottom: 0 !important;
  }
  .dropdown-menu .dropdown-item {
    color: #969696;
    padding: 7px 14px !important;
    border-bottom: 1px solid #e5e5e5 !important;
  }
  .dropdown-menu .dropdown-item:hover {
    text-decoration: none !important;
  }
`;

const StyledDropdownMenu = styled(Dropdown.Menu)``;

function PrimaryDropdown({
  padding,
  items,
  defaultText,
  onSelect,
  width,
  height,
  borderRadius,
  fontSize,
  background,
  borderColor,
  color
}) {
  const handleSelect = (selectedItem) => {
    if (onSelect) {
      onSelect(selectedItem);
    }
  };

  return (
    <MainDropdownStyle
      width={width}
      height={height}
      padding={padding}
      borderRadius={borderRadius}
      fontSize={fontSize}
      background={background}
      borderColor={borderColor}
      color={color}
    >
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="generic-dropdown">
          <p className="mb-0 d-flex align-items-center justify-content-around w-100">
            <span>{defaultText}</span>
            <MdKeyboardArrowDown size="20" />
          </p>
        </Dropdown.Toggle>

        <StyledDropdownMenu>
          {items.map((item) => (
            <Dropdown.Item key={item} eventKey={item}>
              {item}
            </Dropdown.Item>
          ))}
        </StyledDropdownMenu>
      </Dropdown>
    </MainDropdownStyle>
  );
}

PrimaryDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultText: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  background: PropTypes.string,
  fontSize: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
};
PrimaryDropdown.defaultProps = {
  onSelect: () => {},
  width: "150px",
  height: "50px",
  padding: "11px 26px",
  borderRadius: "50px",
  fontSize: "18px",
  background: "#735ad9",
  borderColor: "#735ad9",
  color: "#fff",
};

export default PrimaryDropdown;
