import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import "../css/find-healthcare-Tabsbuttons.css";
import Findhealthmyarticle from "../my_article/find-health-my-article.jsx";
import Findhealthcaremyadds from "../my_adds/find-healthcare-my-adds-main.jsx";
import Findhealthcaremyprofile from "../my_profile/find-healthcare-my-profile.jsx";
import Findhealthcareaddnewlisting from "../my-lisitng/find-healthcare-addnewlisting.jsx";

import svg_one from "../svg-icons/dashboard.svg";
import svg_two from "../svg-icons/mylisting.svg";
import svg_three from "../svg-icons/myads.svg";
import svg_four from "../svg-icons/myarticles.svg";
import svg_five from "../svg-icons/mybookmarks.svg";
import svg_six from "../svg-icons/myprofile.svg";

// import Findhealthcaretotaluserdata from "../components/find-healthcare-total-user-data.jsx";

export default function FindHealthcareTabsButtons() {
  return (
    <div className="find-healthcare-tabs">
      <Tabs
        defaultActiveKey="dashboard"
        id="uncontrolled-tab-example"
        className="mb-3 find-healthcare-items"
      >
        <Tab
          eventKey="dashboard"
          title={
            <>
              <img src={svg_one} alt="svg_one" /> Dashboard
            </>
          }
        >
          <Findhealthcaretotaluserdata />
        </Tab>
        <Tab
          eventKey="listing"
          title={
            <>
              <img src={svg_two} alt="svg_two" /> My listings
            </>
          }
        >
          <Findhealthcareaddnewlisting />
        </Tab>
        <Tab
          eventKey="adds"
          title={
            <>
              <img src={svg_three} alt="svg_three" /> My adds
            </>
          }
        >
          <Findhealthcaremyadds />
        </Tab>
        <Tab
          eventKey="articles"
          title={
            <>
              <img src={svg_four} alt="svg_four" /> My Articles
            </>
          }
        >
          <Findhealthmyarticle />
        </Tab>
        <Tab
          eventKey="bookmarks"
          title={
            <>
              <img src={svg_five} alt="svg_five" /> My Bookmarks
            </>
          }
        >
          Tab content for Contact
        </Tab>
        <Tab
          eventKey="profile"
          title={
            <>
              <img src={svg_six} alt="svg_six" /> My Profile
            </>
          }
        >
          <Findhealthcaremyprofile />
        </Tab>
      </Tabs>
    </div>
  );
}
