import React, { useEffect, useState } from "react";
import "../user/UserSideNavBar1.css";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import NavDropdown from "react-bootstrap/NavDropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import UserHome from "./UserHome";
import UserBookings from "./UserBookings";
import UserSettings from "./UserSettings";
import UserHistory from "./UserHistory";
import CreateAppointment from "./CreateAppointment";
import UserEditBooking from "./UserEditBooking";
import UserChangePassword from "./UserChangePassword";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import { useLogout } from "../../components/hooks/useLogout";

const UserLayout = () => {
  const { user } = useAuthContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const windowSize = window.innerWidth;

  useEffect(() => {
    windowSize > 300 ? setIsSidebarShow(true) : setIsSidebarShow(false);
  }, []);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setItems(items);
    }
  }, []);

  const handleClick = () => {
    isExpanded
      ? setIsExpanded(false)
      : !isExpanded
      ? setIsExpanded(false)
      : setIsExpanded(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
      icon: "fa-solid fa-calendar",
    },
    {
      text: "My Account",
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
          <NavDropdown
            className="text-dark ms-auto dropdown"
            title={items?.email}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to={`/account/account-settings`}
              className="d-flex align-items-center"
            >
              <div className="me-auto">My Account</div>
              <i className="fa-regular fa-user"></i>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={handleLogout}
              className="d-flex align-items-center"
            >
              <div className="me-auto">Sign out</div>{" "}
              <i className="fa-solid fa-right-from-bracket "></i>
            </NavDropdown.Item>
          </NavDropdown>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <Routes>
            <Route index element={user ? <UserHome /> : <Navigate to="/" />} />
            <Route
              path="bookings"
              element={user ? <UserBookings /> : <Navigate to="/" />}
            />
            <Route path="history" element={<UserHistory />} />
            <Route path="account-settings" element={<UserSettings />} />
            <Route path="create-appointment" element={<CreateAppointment />} />
            <Route
              path="bookings/update/:bookingId"
              element={<UserEditBooking />}
            />
            <Route
              path="account-settings/change-password"
              element={<UserChangePassword />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
