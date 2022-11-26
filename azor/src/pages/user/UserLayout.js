import React, { useEffect, useState } from "react";
import "../user/UserSideNavBar1.css";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import NavDropdown from "react-bootstrap/NavDropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import UserHome from "./UserHome";
import UserBookings from "./UserBookings";
import UserSettings from "./UserSettings";
import UserHistory from "./UserHistory";
import CreateAppointment from "./CreateAppointment";
import UserEditBooking from "./UserEditBooking";

const UserLayout = () => {
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSidebarShow, setIsSidebarShow] = useState(false);

  const windowSize = window.innerWidth;

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
      text: "Home",
      path: "/",
      icon: "fa-solid fa-home",
    },
    {
      text: "My Appointments",
      path: "/bookings",
      icon: "fa-solid fa-screwdriver-wrench",
    },
    {
      text: "History",
      path: "/history",
      icon: "fa-solid fa-clock-rotate-left",
    },
    {
      text: "Settings",
      path: "/settings",
      icon: "fa-solid fa-gear",
    },
  ];
  return (
    <div className="main-container">
      {/* SIDEBAR */}
      <div
        className={
          isExpanded
            ? "side-nav-container"
            : "side-nav-container side-nav-container-NX"
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
                to={`/account/user/${id}${item.path}`}
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
          <NavDropdown
            className="text-dark ms-auto dropdown"
            title="Ryan Mark"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href={`/account/user/${id}/account-settings`}>
              My Account
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/" className="d-flex align-items-center">
              <div className="me-auto">Sign out</div>{" "}
              <i className="fa-solid fa-right-from-bracket"></i>
            </NavDropdown.Item>
          </NavDropdown>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <Routes>
            <Route index element={<UserHome />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="history" element={<UserHistory />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="create-appointment" element={<CreateAppointment />} />
            <Route
              path="bookings/update/:bookingId"
              element={<UserEditBooking />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
