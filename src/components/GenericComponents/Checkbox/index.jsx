import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { styled } from "styled-components";

const StyledCheck = styled(Form)`
  display: flex;
  align-items: center;

  .form-check-inline {
    display: flex;
    align-items: center;
  }

  .formLabel {
    color: #090909 !important;
    font-family: Inter !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 19.36px;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 3px;
    // margin-left: 3px;
  }

  input {
    margin-top: 0px !important;
    filter: invert(50%) !important;
    &:focus {
      box-shadow: none !important;
      border-color: #717171 !important;
    }
  }

  ${(props) =>
    props.customStyle &&
    `
    input:checked + label {
      background-color: #f1f5f8 !important;
      border-color: #d9d9d9 !important;
      margin-left: 17px;
    }
  `}

  .form-check-input:checked {
    background-color: transparent;
    border-color: #717171;
  }

  .form-check-input {
    background-color: transparent;
    border-color: #717171;
  }
`;

export default function Checkbox({ customStyle, label, ...props }) {
  return (
    <StyledCheck customStyle={customStyle}>
      <Form.Check
        id={props.id}
        inline={props.inline}
        value={props.value}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        ref={props.inputRef}
        {...props}
      />
      {label && (
        <Form.Check.Label className="formLabel">{label}</Form.Check.Label>
      )}
    </StyledCheck>
  );
}

Checkbox.propTypes = {
  label: PropTypes.node,
  inline: PropTypes.bool,
  inputRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  customStyle: PropTypes.bool,
};

Checkbox.defaultProps = {
  label: null,
  inline: true,
  inputRef: null,
  value: "",
  name: "",
  type: "checkbox",
  onChange: () => {},
  id: "",
  customStyle: true,
};
