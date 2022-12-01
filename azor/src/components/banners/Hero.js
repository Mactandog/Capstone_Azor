import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { useAuthContext } from "../../components/hooks/useAuthContext";
import Swal from "sweetalert2";

const HeroBanner = () => {
  const { user } = useAuthContext();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleClick = () => {
    if (user.isAdmin === true) {
      return Toast.fire({
        icon: "warning",
        title:
          "Sorry, you're not authorized! Only basic users can book an appointment.",
      });
    }
  };

  return (
    <>
      <div className="hero-banner d-flex">
        <Container className="d-flex align-middle align-items-center ">
          <Row>
            <Col xs={12} sm={8} md={7}>
              <h1 className="hero-title">
                Book your motorcycle service online
              </h1>
              <br></br>
              <h3 className="text-white">
                Your trusted motorcycle maintenance service partner.
              </h3>
              <br></br>
              <Button
                href={
                  user && user.isAdmin === false
                    ? "/account/create-appointment"
                    : user && user.isAdmin === true
                    ? "#"
                    : "/login"
                }
                className="text-white fw-semibold fs-5"
                onClick={handleClick}
              >
                <i className="fa-solid fa-calendar-check"></i> BOOK YOUR
                MOTORCYCLE NOW
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HeroBanner;
