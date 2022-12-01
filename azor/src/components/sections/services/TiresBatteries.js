import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import TiresBatteriesImg from "../../../assets/media/images/Tires.png";

const TiresBatteries = () => {
  return (
    <Container>
      <Row className="service-container">
        <Col sm={12} md={6} className="img-container">
          <img
            src={TiresBatteriesImg}
            alt="Tires & Batteries"
            className="service-img"
          />
        </Col>
        <Col sm={12} md={6} className="content-container">
          <div className="text-container">
            <h2>Tires & Batteries</h2>
            <h5 className="content">
              We have motorcycle tires that are designed to perform better in
              all kinds of roads and weather conditions. They have a longer
              lifespan than other tires, no matter what kind of terrain you ride
              on. And since they're premium made by trusted brands, you can be
              confident that our tires will provide the safety and performance
              you need to enjoy every journey.
            </h5>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TiresBatteries;
