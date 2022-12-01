import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import OilChangeImg from "../../../assets/media/images/OilChange.png";

const OilChange = () => {
  return (
    <Container>
      <Row className="service-container">
        <Col sm={12} md={6} className="content-container">
          <div className="text-container">
            <h2>Oil Change</h2>
            <h5 className="content">
              Motorcycle oil is specifically designed to perform under harsh
              conditions and help extend engine life. However, choosing the
              right kind of oil can be a challenge.
            </h5>
            <h5 className="content">
              That's why we offer motorcycle oil change service for quick and
              hassle-free selection of premium oils for your bike.
            </h5>
          </div>
        </Col>
        <Col sm={12} md={6} className="img-container">
          <img src={OilChangeImg} alt="Oil Change" className="service-img" />
        </Col>
      </Row>
    </Container>
  );
};

export default OilChange;
