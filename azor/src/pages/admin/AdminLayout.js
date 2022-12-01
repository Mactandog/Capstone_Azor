import React, { useEffect, useState } from "react";
import "./AdminSideNavBar2.css";
import {
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import NavDropdown from "react-bootstrap/NavDropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import AdminHome from "./AdminHome";
import AdminBookings from "./AdminBookings";
import AdminCompleteBooking from "./AdminCompleteBooking";
import AdminAddUser from "./AdminAddUser";
import AdminAccountSettings from "./AdminAccountSettings";
import { useLogout } from "../../components/hooks/useLogout";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import AdminUserList from "./AdminUserList";
import AdminInquires from "./AdminInquires";

const UserLayout = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const windowSize = window.innerWidth;

  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setItems(items);
    }
  }, []);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    windowSize > 300 ? setIsSidebarShow(true) : setIsSidebarShow(false);
  }, []);

  const handleClick = () => {
    isExpanded
      ? setIsExpanded(false)
      : !isExpanded
      ? setIsExpanded(false)
      : setIsExpanded(true);
  };

  const menuItems = [
    {
      text: "Dashboard",
      path: "/",
      icon: "fa-solid fa-gauge",
    },
    {
      text: "Bookings",
      path: "/bookings",
      icon: "fa-regular fa-calendar-check",
    },
    // {
    //   text: "Add Admin",
    //   path: "/add-admin",
    //   icon: "fa-solid fa-user-plus",
    // },
    {
      text: "Users",
      path: "/users-list",
      icon: "fa-solid fa-users",
    },
    {
      text: "Inquiries",
      path: "/inquiries",
      icon: "fa-solid fa-square-envelope",
    },
    {
      text: "Settings",
      path: "/account-settings",
      icon: "fa-solid fa-gear",
    },
  ];

  return (
    <div className="main-container">
      {/* SIDEBAR */}
      <div
        className={
          isExpanded
            ? "admin-side-nav-container"
            : "admin-side-nav-container admin-side-nav-container-NX"
        }
        style={{ left: isSidebarShow ? "0" : "-240px" }}
      >
        <div className="nav-upper">
          <div className="nav-heading">
            {isExpanded && (
              <div className="nav-brand">
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h1>Azor</h1>
                </NavLink>
              </div>
            )}
          </div>
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="nav-menus">
          {menuItems.map((item, index) => (
            <OverlayTrigger
              key={index}
              placement="right"
              overlay={
                <Tooltip
                  id="tooltip-right"
                  className={!isExpanded ? "tool" : "tool-NX"}
                >
                  <strong>{item.text}</strong>
                </Tooltip>
              }
            >
              <NavLink
                key={index}
                to={`/account${item.path}`}
                className={
                  isExpanded ? "menus-item" : "menus-item menus-item-NX"
                }
                style={({ isActive }) => {
                  return isActive ? { color: "#cb0000" } : {};
                }}
                onClick={handleClick}
              >
                <i className={item.icon}></i>
                {isExpanded && <span>{item.text}</span>}
              </NavLink>
            </OverlayTrigger>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <div className="d-flex flex-column main-section">
        <div
          className="navbar bg-light"
          style={{
            width: "100%",
            height: "10vh",
            position: "fixed",
            zIndex: 100,
          }}
        >
          <h3 style={{ marginLeft: "6rem" }}>Admin</h3>
          <NavDropdown
            className="text-dark ms-auto dropdown"
            title={items?.email}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href={`/account/account-settings`}>
              My Account
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={handleLogOut}
              className="d-flex align-items-center"
            >
              <div className="me-auto">Sign out</div>{" "}
              <i className="fa-solid fa-right-from-bracket"></i>
            </NavDropdown.Item>
          </NavDropdown>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <Routes>
            <Route index element={<AdminHome />} />
            <Route exact path="bookings" element={<AdminBookings />} />
            <Route
              path="bookings/:bookingId/complete-booking"
              element={<AdminCompleteBooking />}
            />
            {/* <Route path="add-admin" element={<AdminAddUser />} /> */}
            <Route path="users-list" element={<AdminUserList />} />
            <Route path="account-settings" element={<AdminAccountSettings />} />
            <Route path="inquiries" element={<AdminInquires />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
