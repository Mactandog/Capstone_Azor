import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ActivityCard from "../../components/cards/users/ActivityCard";
import AddBookingBtn from "../../components/buttons/AddBookingBtn";
import { useBookingsContext } from "../../components/hooks/useBookingsContext";
import Spinner from "react-bootstrap/esm/Spinner";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useAuthContext } from "../../components/hooks/useAuthContext";

const UserHome = () => {
  const { bookings, dispatch } = useBookingsContext();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // fetch data from the server
      const json = await response.json(); // pass to a variable to use the data

      // check if response is ok
      if (response.ok) {
        dispatch({ type: "SET_BOOKINGS", payload: json });
        setLoading(false);
      }
    };
    if (user) {
      fetchBookings();
    }
  }, [dispatch, user]);

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Container className="mt-3 border-bottom border-secondary">
          <h1>Home</h1>
        </Container>
        <Container className="d-flex flex-column mt-2">
          <Card
            bg="dark"
            className="w-100 border-secondary"
            style={{ borderRadius: 0 }}
          >
            <Card.Body className="text-white">
              <Card.Title className="mb-3">
                <h3>
                  <strong>Get rid of your worries for good.</strong>
                </h3>
              </Card.Title>

              <Card.Text>
                It's not all about money though - your motorcycle's service will
                also cover key safety areas such as brakes, steering, suspension
                and tyres and can help to spot potential problems before they
                take you off the road.
              </Card.Text>
              <div className="ms-auto">
                <AddBookingBtn />
              </div>
            </Card.Body>
          </Card>

          <div
            className="d-flex flex-column"
            style={{ position: "relative", paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="mt-5 mb-3">
              <h2>Recent Appoinments</h2>
              <h5>
                <Link to={`/account/bookings`}>See All</Link>
              </h5>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner
                  animation="border"
                  variant="primary"
                  size="lg"
                  className="mt-5"
                />
              </div>
            ) : (
              <Row>
                {bookings !== "" ? (
                  bookings.slice(0, 4).map((booking) => (
                    <Col sm={12} md={6} key={booking._id}>
                      <ActivityCard booking={booking} />
                    </Col>
                  ))
                ) : (
                  <>
                    <h1 className="text-center">
                      It seems you don't have any appointment yet.{" "}
                    </h1>
                    <h2 className="text-primary text-center">
                      Book an appointment now!
                    </h2>
                  </>
                )}
              </Row>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserHome;
