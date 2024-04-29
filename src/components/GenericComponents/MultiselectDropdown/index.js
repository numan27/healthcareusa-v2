/*eslint-disable*/
import styled from "styled-components";
import DropdownTreeSelect from "react-dropdown-tree-select";

const StyledDropdown = styled.div`
  .bootstrap-demo .tag-list {
    height: 45px;
    width: 150px;
  }
  .bootstrap-demo .tag-list input,
  .bootstrap-demo .tag-list .tag-item{
    visibility: hidden !important;
  }
  .bootstrap-demo .root {
    padding: 0px;
    margin: 0px;
  }

  .dropdown-trigger::after {
    content: ${(props) => (props.buttonText ? `'${props.buttonText}'` : "Post Type")};
    // content: 'Post Type';
    font-family: var(--bs-btn-font-family) !important;
    font-weight: 400 !important;
    color: #969696 !important;
    font-size: 14px;
    text-transform: capitalize !important;
    font-style: normal;
    position: absolute;
    top: 24%;
    left: 15px;
    margin-left: 0px;
  }
  .dropdown-trigger ul{
    padding:0px;
  }
  .dropdown-trigger {
    background-color: #f1f5f8 !important;
    color: #969696 !important;
    border-color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12.5px 14px;
    padding-left: 0px !important;
    height: ${(props) => (props.height ? props.height : "50px")}!important;
    width: ${(props) => (props.width ? props.width : "145px")}!important;
    position: relative;
    border: 1px solid #d9d9d9 !important;
    border-radius: ${(props) => (props.radius ? props.radius : "6px")};
  }

  .dropdown-content {
    position: absolute;
    top: 100% !important;
    margin-top: 2px !important;
    z-index: 1000;
    background-color: #f1f5f8;
    min-width: 180px;
    border-radius: 8px;
    padding: 0 !important;
    overflow: hidden !important;
  }
  .dropdown-content li {
    color: #969696;
    padding: 7px 14px !important;
    border-bottom: 1px solid #e5e5e5 !important;
    position: relative;
    font-size: 14px !important;
    text-decoration: none;
    border-radius: 0px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }
  .dropdown-content li:hover {
    background-color: #e2d8ff !important;
  }
  .dropdown-content li i {
    position: absolute;
    right: 10px;
  }
  .dropdown-content li label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .bootstrap-demo .node.leaf {
    padding-left: ${(props) =>
      props.paddingLeft ? props.paddingLeft : "35px"}!important;
    // padding-left: 35px !important;
  }
  .bootstrap-demo .node.leaf:first-child {
    padding-left: ${(props) =>
      props.paddingFirstChild ? props.paddingFirstChild : "14.3px "}!important;
    // padding-left: 14.3px !important;
  }

  .navLink:last-child {
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
  }
  .navLink:first-child {
    border-top-left-radius: 8px !important;
    border-top-right-radius: 8px !important;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
  }

  .checkbox-item:checked {
    background: transparent !important;
  }

  .checkbox-item {
    background-color: transparent !important;
    border-color: #717171;
    margin-top: 0px !important;
  }
  .checkbox-item:checked[type="checkbox"] {
    background-color: transparent !important;
    // filter: invert(50%) !important;
  }
  .checkbox-item:focus {
    box-shadow: none !important;
    border-color: #717171 !important;
  }
`;

const onChange = (currentNode, selectedNodes) => {
  console.log("path::", currentNode.path);
};

const GenericMultiSelect = ({
  radius,
  data,
  height,
  width,
  paddingFirstChild,
  paddingLeft,
  buttonText,
}) => {
  return (
    <StyledDropdown
      radius={radius}
      paddingFirstChild={paddingFirstChild}
      paddingLeft={paddingLeft}
      buttonText={buttonText}
      width={width}
      height={height}
    >
      <DropdownTreeSelect
        data={data}
        onChange={onChange}
        showPartiallySelected="true"
        className="bootstrap-demo"
        label="My Text"
        inlineSearchPlaceholder="placeholder"
      />
    </StyledDropdown>
  );
};

export default GenericMultiSelect;
