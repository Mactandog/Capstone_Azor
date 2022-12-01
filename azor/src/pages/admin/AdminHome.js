import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const AdminHome = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const widgets = [
    {
      title: "Today's Appointments",
      bg: "#cb0000",
      icon: "fa-solid fa-calendar-day",
    },
    {
      title: "Cancelled Appointments",
      bg: "#272531",
      icon: "fa-solid fa-calendar-xmark",
    },
  ];

  return (
    <>
      <Container className="mt-3 border-bottom border-secondary ">
        <h1>
          <i className="fa-solid fa-gauge text-primary"></i> Dashboard
        </h1>
      </Container>
      <Container>
        {loading ? (
          <div classNameName="d-flex justify-content-center">
            <Spinner
              animation="border"
              variant="primary"
              size="lg"
              classNameName="mt-5"
            />
          </div>
        ) : (
          <div className="my-5">
            <Row>
              {widgets &&
                widgets.map((widget) => {
                  return (
                    <Col sm={6} key={widget.title} className="mb-4">
                      <Card
                        className="widget"
                        style={{ borderTopColor: `${widget.bg}` }}
                      >
                        <Card.Body
                          className="text-dark "
                          // style={{ background: `${widget.bg}` }}
                        >
                          <Row>
                            <Col className="mt-0">
                              <h5 className="card-title">{widget.title}</h5>
                            </Col>
                            <Col className="col-auto">
                              <div
                                className="stat"
                                style={{ background: `${widget.bg}` }}
                              >
                                <i
                                  className={`${widget.icon} "align-middle"`}
                                ></i>
                              </div>
                            </Col>
                          </Row>
                          <h1 className="mt-1 mb-3">2.382</h1>
                          <div className="mb-0">
                            <span className="text-danger">
                              {/* <i className={widget.icon}></i>  */}
                              -3.65%{" "}
                            </span>
                            <span className="text-muted">Since last week</span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </div>
        )}
      </Container>
    </>
  );
};

export default AdminHome;
