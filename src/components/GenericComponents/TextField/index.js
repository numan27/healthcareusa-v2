import PropTypes from "prop-types";
import { FormControl, FormLabel } from "react-bootstrap";
import styled from "styled-components";

const StyledInput = styled(FormControl)`
  background: ${(props) =>
    props.background ? props.background : "#F4F5F7"} !important;
  border: ${(props) => props.border} !important;
  margin-bottom: 12px;
  border-radius: ${(props) => props.borderRadius};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : "#B2BAC0"};
  min-width: ${(props) => props.minWidth};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => props.height};
  font-weight: ${(props) => props.fontWeight};
  padding: ${(props) => props.padding};
  outline: 0px;
  &:focus {
    border-color: #00ada2;
    outline: 1px solid #00ada2;
    box-shadow: none !important;
  }
  &:hover{
    border-color: #B2BAC0 !important;
  }
  &::placeholder {
    font-size: ${(props) =>
    props.placeholderTextSize ? props.placeholderTextSize : "14px"} !important;
    color: ${(props) => props.placeHolderColor} !important;
    font-weight: 400 !important;
    font-family: Plus Jakarta Sans;
  }
`;

const StyledLabel = styled(FormLabel)`
    color: #23262F;
    font-size: 14px;
    line-height: 21px;
    font-weight: 400;
    font-family: Plus Jakarta Sans;
`;

export default function GenericInput({ label, type, onFileChange, ...props }) {
  const isFileInput = type === "file";

  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      {isFileInput ? (
        <StyledInput
          {...props}
          type="file"
          name={props.name}
          onChange={onFileChange}
          className={props.className}
          ref={props.inputRef}
        />
      ) : (
        <StyledInput
          {...props}
          type={type}
          defaultValue={props.defaultValue}
          value={props.value}
          placeholder={props.placeholder}
          name={props.name}
          onChange={props.onChange}
          className={props.className}
          ref={props.inputRef}
        />
      )}
    </>
  );
}

GenericInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  placeholder: PropTypes.string,
  placeHolderColor: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  height: PropTypes.string,
  background: PropTypes.string,
  onFileChange: PropTypes.func,
};

GenericInput.defaultProps = {
  type: "text",
  name: "",
  inputRef: () => { },
  placeholder: "Enter Text Here",
  placeHolderColor: "#64666C",
  borderRadius: "4px",
  padding: "10px",
  height: "",
  background: "",
  className: "",
  onClick: () => { },
  icon: null,
  defaultValue: "",
  onChange: () => { },
  value: null,
  onFileChange: () => { },
};
