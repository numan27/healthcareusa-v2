/* eslint-disable */
import styled from "styled-components";
import PropTypes from "prop-types";
import { Tab, Tabs, Nav } from "react-bootstrap";
import Box from "../Box";
import { useState } from "react";

const StyledTabs = styled.div`
  .custom-tabs {
    padding: ${(props) => (props.padding ? props.padding : "")} !important;
  }
  .tab-content {
    // padding: 25px;
  }
  .nav-item .nav-link {
    color: #fff;
    background-color: #23262f;
    font-weight: 600;
    font-size: 18px;
    border-radius: 5px 5px 0px 0px !important;
    // padding: 16px 28px;
    min-width: 240px;
    height: 48px !important;
  }
  .nav-item .nav-link.active {
    background-color: #fff;
    color: #2d3b48;
  }
`;

function GenericTabs(props) {
  const { id, tabs, className, onSelect } = props;
  const defaultActiveKey = tabs.length > 0 ? tabs[0].eventKey : "";
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const handleSelect = (key) => {
    setActiveKey(key);
    if (onSelect) {
      onSelect(key);
    }
  };

  return (
    <StyledTabs>
      <Box className="w-100 d-flex flex-column align-items-center justify-content-center rounded-2">
        <Nav
          variant="tabs"
          className={`gap-2 d-flex justify-content-center flex-wrap flex-sm-row flex-column ${className}`}
        >
          {tabs.map((tab) => (
            <Nav.Item key={tab.eventKey}>
              <Nav.Link
                eventKey={tab.eventKey}
                active={activeKey === tab.eventKey}
                onClick={() => handleSelect(tab.eventKey)}
                className="text-center"
              >
                {tab.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <div className="tab-content bg-white min-vw-100">
          {tabs.map(
            (tab) =>
              activeKey === tab.eventKey && (
                <div key={tab.eventKey} className="tab-pane active">
                  {tab.content}
                </div>
              )
          )}
        </div>
      </Box>
    </StyledTabs>
  );
}

GenericTabs.propTypes = {
  defaultActiveKey: PropTypes.string,
  id: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      eventKey: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ),
  className: PropTypes.string,
  onSelect: PropTypes.func,
};

GenericTabs.defaultProps = {
  defaultActiveKey: "profile",
  id: "uncontrolled-tab-example",
  padding: "25px 25px 0 25px",
  tabs: [
    {
      eventKey: "home",
      title: "Home",
      content: "Tab content for Home",
    },
    {
      eventKey: "profile",
      title: "Profile",
      content: "Tab content for Profile",
    },
  ],
  className: "mb-3",
};

export default GenericTabs;
