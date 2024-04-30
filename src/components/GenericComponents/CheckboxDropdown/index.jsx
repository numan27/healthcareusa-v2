import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Dropdown, Form } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
// import { MdKeyboardArrowDown } from "react-icons/md";

const StyledDropdown = styled.div`
  .dropdown-toggle {
    background-color: #F1F1F1;
    color: #23262F;
    // border-color: #d9d9d9;
    display: flex;
    border: 0px;
    align-items: center;
    font-size: 14px !important;
    font-weight: 400 !important;
    justify-content: between;
    padding: 8px 12px;
    height: ${(props) => (props.height ? props.height : "38px")} !important;
    width: ${(props) => (props.width ? props.width : "")} !important;
    border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "4px"} !important;
  }
  
.dropdown-toggle::after {
  margin-left: 1em;
  color: #B1B1B1 !important;
  font-size: 18px !important;
} 
  .dropdown-toggle:focus{
    background-color: #F1F1F1;
    color: #23262F;
  }
  .dropdown-menu {
    background-color: #fff !important;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border: 0 !important;
    margin-top: 8px;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .dropdown-menu .dropdown-item:nth-last-child(1) {
    border-bottom: 0 !important;
  }
  .dropdown-menu .dropdown-item {
      color: #23262F;
      font-size: 16px;
      line-height: 22px;
      padding: 5px 24px 5px 18px !important;
      // border-bottom: 1px solid #e5e5e5 !important;
      cursor: pointer;
    }
    .dropdown-menu .dropdown-item:hover {
      border-radius: 0px !important;
      background-color: #a1e0db;
      // color: #fff;
    }
    // .dropdown-menu .dropdown-item:hover .form-check-input{
    //   border-color: #fff !important;
    // }

  .dropdown-menu .dropdown-item:first-child{
    border-top-left-radius: 4px !important;
    border-top-right-radius: 4px !important;
  }
  .dropdown-menu .dropdown-item:last-child{
    border-bottom-left-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
  }
  
  .dropdown-item:hover a {
    color: #735ad9 !important;
    text-decoration: none !important;
  }
  svg {
    margin-left: 10px !important;
  }
`;

const StyledCheckbox = styled(Form)`
  .form-check-inline {
    display: flex;
    align-items: center;
  }

  display: flex !important;
  align-items: center !important;

  .form-check-input {
    background-color: transparent;
    border-color: #717171;
    margin-top: 0px !important;
    cursor: pointer !important;
  }
  .form-check-input: {

  }
  .form-check-input:checked[type="checkbox"] {
    filter: invert(48%) sepia(54%) saturate(1214%) hue-rotate(138deg) brightness(101%) contrast(101%);
    border-color: #00C1B6 !important;
  }
  .form-check-input:focus {
    box-shadow: none !important;
  }
`;

const CheckboxMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={`${className} CheckboxMenu`}
      aria-labelledby={labeledBy}
    >
      <div
        className="d-flex flex-column"
        style={{ maxHeight: "calc(100vh)", overflow: "none" }}
      >
        <ul
          className="list-unstyled flex-shrink mb-0"
          style={{ overflow: "auto" }}
        >
          {children}
        </ul>
      </div>
    </div>
  );
});

const CheckDropdownItem = React.forwardRef(({ children, id, checked, onChange }, ref) => {
  return (
    <StyledCheckbox>
      <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
        <Form.Check
          className="d-flex align-items-center gap-2"
          type="checkbox"
          label={children}
          checked={checked}
          onChange={onChange && onChange.bind(onChange, id)}
        />
      </Form.Group>
    </StyledCheckbox>
  );
});

const CheckboxDropdown = observer(({ items, height, title }) => {
  const [checkboxItems, setCheckboxItems] = useState(items);

  const handleChecked = (key, event) => {
    const updatedItems = checkboxItems.map(item =>
      item.id === key ? { ...item, checked: event.target.checked } : item
    );
    setCheckboxItems(updatedItems);
  };

  return (
    <StyledDropdown height={height} title={title}>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {title}
          {/* <MdKeyboardArrowDown size="20" /> */}
        </Dropdown.Toggle>

        <Dropdown.Menu as={CheckboxMenu}>
          {checkboxItems.map((item) => (
            <Dropdown.Item
              key={item.id}
              as={CheckDropdownItem}
              id={item.id}
              checked={item.checked}
              onChange={handleChecked}
              className="d-flex align-items-center"
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </StyledDropdown>
  );
});

CheckboxDropdown.propTypes = {
  items: PropTypes.arrayOf(
  ).isRequired,
  height: PropTypes.string,
  title: PropTypes.string,
};

CheckboxDropdown.defaultProps = {
  height: "38px",
  title: "title",
};

export default CheckboxDropdown;
