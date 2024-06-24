/* eslint-disable */
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  .react-select__control {
    border-color: ${(props) => props.borderColor};
    background: ${(props) => props.bgcolor};
    min-width: ${(props) => props.minwidth};
    width: 100%;
    height: 100%;
    min-height: ${(props) => props.minheight};
    max-height: ${(props) => props.maxheight};
    font-size: ${(props) => props.fontSize};
    outline: none;
    box-shadow: none;
    cursor: pointer;
    border-radius: ${(props) => props.borderRadius};
  }
  .react-select__menu-list {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    border-radius: 4px;
    font-size: 14px;
  }
  .react-select__menu {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
    width: ${(props) => props.width};
    z-index: 999 !important;
  }
  .react-select__option {
    background-color: transparent;
    color: #333333;
  }
  .react-select__option:hover {
    background-color: #00c1b6;
    color: #fff !important;
  }
  .react-select__single-value {
    color: ${(props) => props.valueColor} !important;
  }
  .react-select__indicators .react-select__indicator {
    color: ${(props) => props.iconColor} !important;
    stroke-width: 0px !important;
  }
  .react-select__placeholder {
    color: ${(props) => props.placeholderColor} !important;
    font-size: 14px !important;
  }
  .without-image {
    margin-left: 10px !important;
  }
`;

const customStyles = {
  dropdownIndicator: (base) => ({
    ...base,
    color: "#969696",
    background: "transparent",
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused ? null : null,
    outline: "none",
    borderRadius: "8px",
    "&:hover": {
      borderColor: "transparent",
    },
  }),
  option: (base) => ({
    ...base,
    color: "#969696",
    padding: "7px 14px!important",
    borderBottom: "1px solid #e5e5e5!important",
  }),
  placeholder: (styles) => ({ ...styles, color: "#969696", fontSize: "12px" }),
  singleValue: (styles) => ({ ...styles, color: "#969696" }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const customComponents = ({ imageComponent, isMulti }) => ({
  SingleValue: ({ children, ...props }) => (
    <div className="d-flex align-items-center gap-1">
      {imageComponent ? <span>{imageComponent}</span> : ""}
      <span className={!imageComponent ? "without-image" : ""}>{children}</span>
    </div>
  ),
  Placeholder: ({ children, ...props }) => (
    <div className="d-flex align-items-center gap-1">
      {imageComponent ? <span>{imageComponent}</span> : ""}
      <span className={!imageComponent ? "without-image" : ""}>{children}</span>
    </div>
  ),
  Option: (props) => (
    <components.Option {...props}>
      {isMulti && (
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          className="me-2"
        />
      )}{" "}
      <label>{props.label}</label>
    </components.Option>
  ),
});

const GenericSelect = ({
  imageComponent,
  borderColor,
  minwidth,
  width,
  minheight,
  maxheight,
  bgcolor,
  borderRadius,
  placeholder,
  onSelect,
  options,
  className,
  isSearchable,
  isMulti,
  iconColor,
  fontSize,
  placeholderColor,
  valueColor,
  ...props
}) => {
  const handleSelect = (selectedItem) => {
    if (onSelect) {
      onSelect(selectedItem);
    }
  };

  return (
    <StyledSelect
      onChange={handleSelect}
      components={{
        ...customComponents({ imageComponent, isMulti }),
        IndicatorSeparator: () => null,
      }}
      borderColor={borderColor}
      valueColor={valueColor}
      iconColor={iconColor}
      placeholderColor={placeholderColor}
      minwidth={minwidth}
      width={width}
      minheight={minheight}
      maxheight={maxheight}
      bgcolor={bgcolor}
      fontSize={fontSize}
      borderRadius={borderRadius}
      className={`${className} react-select-container`}
      classNamePrefix="react-select"
      styles={customStyles}
      placeholder={placeholder}
      options={options}
      isSearchable={isSearchable}
      isMulti={isMulti}
      {...props}
    />
  );
};

GenericSelect.propTypes = {
  imageComponent: PropTypes.node,
  borderColor: PropTypes.string,
  minwidth: PropTypes.string,
  width: PropTypes.string,
  minheight: PropTypes.string,
  maxheight: PropTypes.string,
  bgcolor: PropTypes.string,
  borderRadius: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  iconColor: PropTypes.string,
  fontSize: PropTypes.string,
  placeholderColor: PropTypes.string,
  valueColor: PropTypes.string,
};

GenericSelect.defaultProps = {
  onSelect: () => {},
  borderColor: "rgb(213, 217, 229)",
  minheight: "",
  maxheight: "50px",
  bgcolor: "rgb(241, 245, 248)",
  minwidth: "",
  width: "",
  isSearchable: false,
  isMulti: false,
  borderRadius: "8px",
  fontSize: "15px",
  className: "",
  valueColor: "#333333",
  iconColor: "#BBB6B6",
  placeholderColor: "#333333",
};

export default GenericSelect;
