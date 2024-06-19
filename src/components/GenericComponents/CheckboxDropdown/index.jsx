import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Dropdown, Form, FormLabel } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

const StyledDropdown = styled.div`
  .dropdown-toggle {
    background-color: #f4f5f7;
    color: #23262f;
    display: flex;
    border: 0px;
    align-items: center;
    font-size: 14px !important;
    font-weight: 400 !important;
    justify-content: space-between;
    padding: 8px 12px;
    border: ${(props) => (props.border ? props.border : "0px")} !important;
    height: ${(props) => (props.height ? props.height : "38px")} !important;
    width: ${(props) => (props.width ? props.width : "fit-content")};
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : "4px"} !important;
    border-color: ${(props) => props.borderColor};
  }

  .dropdown-toggle::after {
    margin-left: 1em;
    color: #b1b1b1 !important;
    font-size: 18px !important;
  }
  .dropdown-toggle:focus {
    background-color: #f1f1f1;
    color: #23262f;
  }
  .dropdown-menu {
    background-color: #fff !important;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border: 0 !important;
    margin-top: 8px;
    padding-top: 0px;
    padding-bottom: 0px;
    width: 100%;
    min-width: 200px;
  }

  .dropdown-menu .dropdown-item:nth-last-child(1) {
    border-bottom: 0 !important;
  }
  .dropdown-menu .dropdown-item {
    color: #23262f;
    font-size: 16px;
    line-height: 22px;
    padding: 5px 24px 5px 18px !important;
    cursor: pointer;
  }
  .dropdown-menu .dropdown-item:hover {
    border-radius: 0px !important;
    background-color: #eaffff;
  }
  .dropdown-menu .dropdown-item:first-child {
    border-top-left-radius: 4px !important;
    border-top-right-radius: 4px !important;
  }
  .dropdown-menu .dropdown-item:last-child {
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

  .selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .selected-item {
    background-color: #e0e0e0;
    border-radius: 12px;
    padding: 2px 8px;
    display: flex;
    align-items: center;
  }

  .selected-item span {
    margin-right: 4px;
  }

  .selected-item svg {
    cursor: pointer;
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
    border-color: #d0d5dd;
    margin-top: 0px !important;
    cursor: pointer !important;
  }

  .form-check-input:checked[type="checkbox"] {
    filter: invert(48%) sepia(54%) saturate(1214%) hue-rotate(138deg)
      brightness(101%) contrast(101%);
    border-color: #14a077 !important;
  }
  .form-check-input:focus {
    box-shadow: none !important;
  }
`;

const StyledLabel = styled(FormLabel)`
  color: #23262f;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  font-family: Plus Jakarta Sans;
`;

const CheckboxMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
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
  }
);

CheckboxMenu.displayName = "CheckboxMenu";

const CheckDropdownItem = React.forwardRef(
  ({ children, id, checked, onChange, haveLabel, labelValue }, ref) => {
    return (
      <StyledCheckbox>
        {haveLabel && <StyledLabel>{labelValue}</StyledLabel>}
        <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
          <Form.Check
            className="d-flex align-items-center gap-2 cursor-pointer"
            type="checkbox"
            label={children}
            checked={checked}
            onChange={onChange && onChange.bind(onChange, id)}
          />
        </Form.Group>
      </StyledCheckbox>
    );
  }
);

CheckDropdownItem.displayName = "CheckDropdownItem";

const CheckboxDropdown = observer(
  ({
    items,
    height,
    width,
    title,
    labelValue,
    haveLabel,
    border,
    borderColor,
    onChange,
    singleSelect,
  }) => {
    const nonEmptyItems = items.filter(
      (item) => item && item.label && item.label.trim()
    );

    const [checkboxItems, setCheckboxItems] = useState(nonEmptyItems);

    const handleChecked = (key, event) => {
      const updatedItems = checkboxItems.map((item) =>
        item.id === key ? { ...item, checked: event.target.checked } : item
      );
      setCheckboxItems(updatedItems);

      const selectedItems = updatedItems.filter((item) => item.checked);
      console.log("Selected items:", selectedItems); // Add this log
      onChange(selectedItems); // Pass selected items to onChange
    };

    return (
      <StyledDropdown
        haveLabel={haveLabel}
        height={height}
        width={width}
        title={title}
        border={border ? "1px solid #B2BAC0" : "0px"}
        borderColor={borderColor}
      >
        {haveLabel ? <StyledLabel>{labelValue}</StyledLabel> : ""}
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <div className="selected-items">
              {checkboxItems
                .filter((item) => item.checked)
                .map((item) => (
                  <div className="selected-item" key={item.id}>
                    <span>{item.label}</span>
                    <FaTimes
                      onClick={() =>
                        handleChecked(item.id, { target: { checked: false } })
                      }
                    />
                  </div>
                ))}
              {!checkboxItems.some((item) => item.checked) && title}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu as={CheckboxMenu}>
            {checkboxItems.map((item) =>
              // Render either checkbox or dropdown item based on singleSelect prop
              singleSelect ? (
                <Dropdown.Item
                  key={item.id}
                  onClick={() =>
                    handleChecked(item.id, {
                      target: { checked: !item.checked },
                    })
                  }
                  className="d-flex align-items-center cursor-pointer"
                >
                  {item.label}
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  key={item.id}
                  as={CheckDropdownItem}
                  id={item.id}
                  checked={item.checked}
                  onChange={handleChecked}
                  className="d-flex align-items-center cursor-pointer"
                >
                  {item.label}
                </Dropdown.Item>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
      </StyledDropdown>
    );
  }
);

CheckboxDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })
  ).isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string,
  haveLabel: PropTypes.bool,
  labelValue: PropTypes.string,
  border: PropTypes.bool,
  borderColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  singleSelect: PropTypes.bool,
};

CheckboxDropdown.defaultProps = {
  height: "38px",
  width: "",
  title: "title",
  border: false,
  borderColor: "#B2BAC0",
  haveLabel: false,
  labelValue: "",
  singleSelect: false,
};

CheckboxDropdown.displayName = "CheckboxDropdown";

export default CheckboxDropdown;
