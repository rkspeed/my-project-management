import React, { useState } from "react";

const NavSidebar = () => {
  return (
    <div>
      <nav className="pcoded-navbar" style={{ overflow: "scroll" }}>
        <div className="navbar-wrapper">
          <div className="navbar-brand header-logo">
            <a href="/" className="b-brand">
              <div className="b-bg">
                <i className="feather icon-trending-up"></i>
              </div>
              <span className="b-title">Deffect Management</span>
            </a>
          </div>
          <div className="navbar-content scroll-div">
            <ul className="nav pcoded-inner-navbar">
              <li
                data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"
                className="nav-item active"
              >
                <a href="/" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-home"></i>
                  </span>
                  <span className="pcoded-mtext">Dashboard</span>
                </a>
              </li>

              <li
                data-username="basic components Button Alert Badges breadcrumb Paggination progress Tooltip popovers Carousel Cards Collapse Tabs pills Modal Grid System Typography Extra Shadows Embeds"
                className="nav-item pcoded-hasmenu"
              >
                <a href="/projects" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-box"></i>
                  </span>
                  <span className="pcoded-mtext">Projects</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a href="/projects_view" className="">
                      View projects
                    </a>
                  </li>
                  <li className="">
                    <a href="/projects_add" className="">
                      Add projects
                    </a>
                  </li>
                </ul>
              </li>
              <li
                data-username="basic components Button Alert Badges breadcrumb Paggination progress Tooltip popovers Carousel Cards Collapse Tabs pills Modal Grid System Typography Extra Shadows Embeds"
                className="nav-item pcoded-hasmenu"
              >
                <a href="/bugs" className="nav-link ">
                  <span className="pcoded-micon">
                    <i className="feather icon-box"></i>
                  </span>
                  <span className="pcoded-mtext">Bugs</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a href="/bugs_view" className="">
                      View bugs
                    </a>
                  </li>
                  <li className="">
                    <a href="/bugs_add" className="">
                      Add bugs
                    </a>
                  </li>
                  <li className="">
                    <a href="/change_bug_status" className="">
                      Change bugs status
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavSidebar;
