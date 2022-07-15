import React, { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [Header, setHeader] = useState(false);
  return (
    <nav
      className={
        Header
          ? "main-header main-header-end navbar navbar-expand navbar-white navbar-light"
          : "main-header navbar navbar-expand navbar-white navbar-light"
      }
    >
      <ul className="navbar-nav flex items-center">
        <li className="nav-item" onClick={() => setHeader(!Header)}>
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" clLinkssName="nav-link">
            Home
          </Link>
        </li>
      </ul>

      <ul
        className={
          Header
            ? "navbar-nav ml-auto-style ml-auto-style-end"
            : "navbar-nav ml-auto-style"
        }
      >
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown">
            <i class="fas fa-user-circle" style={{ fontSize: "25px" }}></i>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <Link to="/" className="dropdown-item">
              <i className="fas fa-users mr-2" /> Logout
            </Link>
            <div className="dropdown-divider" />
            <Link to="/admin/reset" className="dropdown-item">
              <i class="fas fa-key  mr-2"></i> Reset password
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
