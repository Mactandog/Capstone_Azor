import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import FooterMain from "../footers/FooterMain";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const MainNavbar = () => {
  const { id } = useParams();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Navbar bg="white" expand="md" className="main-navbar" sticky="top">
        <Container className="d-flex align-items-center">
          <Navbar.Brand>
            <NavLink
              style={({ isActive }) => {
                return isActive ? { color: "black" } : {};
              }}
              to="/"
            >
              <h1 className="text-primary me-4">Azor</h1>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-grow-1 pe-3 gap-3">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/about-us">About</NavLink>
                <NavLink to="/contact-us">Contact</NavLink>
              </Nav>
              {/* <Button className="btn btn-primary text-white">Login</Button> */}
              <div className="d-flex align-items-center">
                {!user && (
                  <>
                    <Button
                      as={Link}
                      to="/login"
                      variant="outline-primary"
                      size="sm"
                      className="me-3 text-dark"
                    >
                      Login
                    </Button>
                    <Button
                      as={Link}
                      to="/register"
                      variant="primary"
                      size="sm"
                      className="text-white"
                      style={{ hover: { color: "white" } }}
                    >
                      Register
                    </Button>
                  </>
                )}
                {user && (
                  <NavDropdown
                    className="text-dark ms-auto dropdown"
                    title={user?.email}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item
                      href={`/account`}
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
                )}

                {/* <NavLink to="/login">
                  <i className="fa-regular fa-user text-dark fs-4"></i>
                </NavLink> */}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
      <FooterMain />
    </>
  );
};

export default MainNavbar;
