import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import BreaksImg from "../../../assets/media/images/Breaks.png";

const Breaks = () => {
  return (
    <Container>
      <Row className="service-container">
        <Col sm={12} md={6} className="img-container">
          <img src={BreaksImg} alt="Breaks" className="service-img" />
        </Col>
        <Col sm={12} md={6} className="content-container">
          <div className="text-container">
            <h2>Breaks</h2>
            <h5 className="content">
              Azor motorcycle services offers the best break repairs and
              replacements.
            </h5>
            <h5 className="content">
              We have a team of highly skilled mechanics who can fix any problem
              associated with breaking systems, pads and drums. We also provide
              all kind of spares for breaks and other auto parts.
            </h5>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Breaks;
