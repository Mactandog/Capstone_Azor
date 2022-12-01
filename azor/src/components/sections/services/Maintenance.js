import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import MaintenanceImg from "../../../assets/media/images/Maintenance.png";

const Maintenance = () => {
  return (
    <Container>
      <Row className="service-container">
        <Col sm={12} md={6} className="content-container">
          <div className="text-container">
            <h2>Maintenance</h2>
            <h5 className="content">
              Motorcycle maintenance helps you to keep your motorcycle running
              in optimal condition.
            </h5>
            <h5 className="content">
              We carry out routine checks, repair work and anything else that is
              needed to keep your bike in top shape. We make sure it stays in
              peak condition for longer and performs better for the long haul.
            </h5>
          </div>
        </Col>
        <Col sm={12} md={6} className="img-container">
          <img src={MaintenanceImg} alt="Maintenance" className="service-img" />
        </Col>
      </Row>
    </Container>
  );
};

export default Maintenance;
