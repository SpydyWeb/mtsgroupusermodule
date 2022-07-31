import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { MdOutlineExpandMore } from "react-icons/md";
let parsedObj;

const Sidebar = () => {
  useEffect(() => {
    const str = localStorage.getItem("AccObj");
    parsedObj = JSON.parse(str);
  }, []);

  console.log(parsedObj, "log");
  const location = useLocation();
  const [expanded, setExpanded] = useState();
  const [expandedSec, setExpandedSec] = useState();

  const AllExpanded = () => {
    setExpanded(false);
    setExpandedSec(false);
  };

  // an object
  const AccorState = {
    First: expanded,
    Second: expandedSec,
  };

  const jsonObj = JSON.stringify(AccorState);
  const SideBarOpen = () => {
    setExpanded(!expanded);
  };
  const SideBar = () => {
    setExpanded(true);
    setExpandedSec(false);
    localStorage.setItem("AccObj", jsonObj);
  };

  const SideBarOpenSec = () => {
    setExpandedSec(!expandedSec);
  };
  const SideBarSec = () => {
    setExpandedSec(true);
    localStorage.setItem("myObjectSec", expandedSec);
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">MTS GROUP</span>
      </Link>
      <div className="sidebar">
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <ul className="nav nav-treeview">
                <li className="nav-item" onClick={() => AllExpanded()}>
                  <Link
                    to="/admin"
                    className={`nav-link ${
                      location.pathname === "/admin" ? "bg-white" : ""
                    }`}
                  >
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard </p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div>
          <Accordion className="sidebarAccord " expanded={expanded}>
            <AccordionSummary
              onClick={() => SideBarOpen()}
              expandIcon={
                <MdOutlineExpandMore style={{ color: "rgb(194, 199, 208)" }} />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <i class="mr-2 fas fa-users"></i>
                User Module
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-0">
              <Typography className="p-0">
                <ul className="nav nav-treeview">
                  <li className="nav-item w-full" onClick={() => SideBar()}>
                    <Link
                      to="/admin/getallrole"
                      className={`nav-link flex items-center ml-3 ${
                        location.pathname === "/admin/getallrole"
                          ? "bg-white"
                          : ""
                      }`}
                    >
                      <i className="mr-2 far fa-calendar-alt" />
                      <p>Role Master</p>
                    </Link>
                  </li>
                  <li className="nav-item w-full">
                    <Link
                      to="/admin/subaccessrole"
                      className={`nav-link flex items-center  ml-3 ${
                        location.pathname === "/admin/subaccessrole"
                          ? "bg-white"
                          : ""
                      }`}
                    >
                      <i className="mr-2 far fa-image" />
                      <p>Access Control Master</p>
                    </Link>
                  </li>

                  <li className="nav-item w-full">
                    <Link
                      to="/admin/viewaccessrole"
                      className={`nav-link flex items-center  ml-3 ${
                        location.pathname === "/admin/viewaccessrole"
                          ? "bg-white"
                          : ""
                      }`}
                    >
                      <i className="mr-2 fas fa-columns" />
                      <p>Role Definition </p>
                    </Link>
                  </li>
                  <li className="nav-item w-full">
                    <Link
                      to="/admin/getalluser"
                      className={`nav-link flex items-center  ml-3 ${
                        location.pathname === "/admin/getalluser"
                          ? "bg-white"
                          : ""
                      }`}
                    >
                      <i className="mr-2 fas fa-columns" />
                      <p>User Registration</p>
                    </Link>
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="sidebarAccord" expanded={expandedSec}>
            <AccordionSummary
              onClick={() => SideBarOpenSec()}
              expandIcon={
                <MdOutlineExpandMore style={{ color: "rgb(194, 199, 208)" }} />
              }
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                {" "}
                <i className="mr-2 fas fa-chart-pie" />
                Vendor Module
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-0">
              <Typography className="p-0">
                <ul className="nav nav-treeview">
                  <Accordion className="sidebarAccord ml-3">
                    <AccordionSummary
                      expandIcon={
                        <MdOutlineExpandMore
                          style={{
                            color: "rgb(194, 199, 208)",
                          }}
                        />
                      }
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography>
                        <i class="mr-2 fas fa-users"></i>
                        Vendor Master
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="p-0">
                      <Typography className="p-0">
                        <ul className="nav nav-treeview">
                          <li
                            className="nav-item w-full"
                            onClick={() => SideBarSec()}
                          >
                            <Link
                              to="/admin/licencetable"
                              className={`nav-link flex items-center  ml-3 ${
                                location.pathname === "/admin/licencetable"
                                  ? "bg-white"
                                  : ""
                              }`}
                            >
                              <i className="mr-2 fas fa-columns" />
                              <p>Licence Type</p>
                            </Link>
                          </li>
                          <li className="nav-item d-none w-full">
                            <Link
                              to="/admin/communicationproducttable"
                              className={`nav-link flex items-center ml-3 ${
                                location.pathname ===
                                "/admin/communicationproducttable"
                                  ? "bg-white"
                                  : ""
                              }`}
                            >
                              <i className="mr-2 fas fa-columns" />
                              <p>Communication product</p>
                            </Link>
                          </li>
                          <li className="nav-item w-full">
                            <Link
                              to="/admin/communicationtable"
                              className={`nav-link flex items-center ml-3 ${
                                location.pathname ===
                                "/admin/communicationtable"
                                  ? "bg-white"
                                  : ""
                              }`}
                            >
                              <i className="mr-2 fas fa-columns" />
                              <p>Communication Type</p>
                            </Link>
                          </li>
                          <li className="nav-item w-full">
                            <Link
                              to="/admin/statetable"
                              className={`nav-link flex items-center ml-3 ${
                                location.pathname === "/admin/statetable"
                                  ? "bg-white"
                                  : ""
                              }`}
                            >
                              <i className="mr-2 fas fa-columns" />
                              <p>State</p>
                            </Link>
                          </li>
                          <li className="nav-item w-full">
                            <Link
                              to="/admin/viewvendorproduct"
                              className={`nav-link flex items-center ml-3 ${
                                location.pathname === "/admin/viewvendorproduct"
                                  ? "bg-white"
                                  : ""
                              }`}
                            >
                              <i className="mr-2 fas fa-columns" />
                              <p>Vendor Product</p>
                            </Link>
                          </li>
                        </ul>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <li className="nav-item w-full">
                    <Link
                      to="/admin/viewvendor"
                      className={`nav-link  flex items-center ml-3 ${
                        location.pathname === "/admin/viewvendor"
                          ? "bg-white"
                          : ""
                      }`}
                    >
                      <i className="mr-2 fas fa-columns" />
                      <p>View Vendor </p>
                    </Link>
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
