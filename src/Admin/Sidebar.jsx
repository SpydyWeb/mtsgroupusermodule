import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const collapseActive = () => {
    document.body.classList.remove("sidebar-open");
    document.body.classList.add("sidebar-closed");
  };

  document.body.addEventListener("click", () => {
    collapseActive();
  });
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
                <li className="nav-item">
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

            <li className="nav-item">
              <Link
                to="/admin/getallrole"
                className={`nav-link ${
                  location.pathname === "/admin/getallrole" ? "bg-white" : ""
                }`}
              >
                <i className="nav-icon far fa-calendar-alt" />
                <p>Role Master</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/subaccessrole"
                className={`nav-link ${
                  location.pathname === "/admin/subaccessrole" ? "bg-white" : ""
                }`}
              >
                <i className="nav-icon far fa-image" />
                <p>Access Control Master</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/viewaccessrole"
                className={`nav-link ${
                  location.pathname === "/admin/viewaccessrole"
                    ? "bg-white"
                    : ""
                }`}
              >
                <i className="nav-icon fas fa-columns" />
                <p>Role Definition </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/getalluser"
                className={`nav-link ${
                  location.pathname === "/admin/getalluser" ? "bg-white" : ""
                }`}
              >
                <i className="nav-icon fas fa-columns" />
                <p>User Registration</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/vendercreation"
                className={`nav-link ${
                  location.pathname === "/admin/vendercreation"
                    ? "bg-white"
                    : ""
                }`}
              >
                <i className="nav-icon fas fa-columns" />
                <p>New Vendor Creation</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/licencetable"
                className={`nav-link ${
                  location.pathname === "/admin/licencetable" ? "bg-white" : ""
                }`}
              >
                <i className="nav-icon fas fa-columns" />
                <p>Licence Type</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/communicationproduct"
                className={`nav-link ${
                  location.pathname === "/admin/communicationproduct"
                    ? "bg-white"
                    : ""
                }`}
              >
                <i className="nav-icon fas fa-columns" />
                <p>Communication product</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/communication"
                className={`nav-link ${
                  location.pathname === "/admin/communication" ? "bg-white" : ""
                }`}
              >
                <i className="nav-icon fas fa-columns" />
                <p>Communication Type</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/state"
                className={`nav-link ${
                  location.pathname === "/admin/state" ? "bg-white" : ""
                }`}
              >
                <i className="nav-icon fas fa-columns" />
                <p>State</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
