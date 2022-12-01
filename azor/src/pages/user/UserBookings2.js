import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import BookingCard from "../../components/cards/users/BookingCard";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { useBookingsContext } from "../../components/hooks/useBookingsContext";
import UserBookingPagination from "../../components/paginations/UserBookingPagination";
import Spinner from "react-bootstrap/Spinner";
import AddBookingBtn from "../../components/buttons/AddBookingBtn";
import { useAuthContext } from "../../components/hooks/useAuthContext";

const UserBookings = () => {
  const { user } = useAuthContext();
  const { bookings, dispatch } = useBookingsContext();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  // const [lastPage, setLastPage] = useState(null);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  // const currentPosts = bookings.slice(firstPostIndex, lastPostIndex);
  // console.log(currentPosts);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${user.token}` },
      }); // fetch data from the server
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

  const viewBooking = () => {};
  const editBooking = () => {};

  const countBooking = () => {};
  return (
    <>
      <Container className="mt-3 border-bottom border-secondary">
        {/* <Row className="mb-3">
          <Col sm={12} lg={8}>
            <h1>My Appointments</h1>
          </Col>
          <Col lg={4}>
            <AddBookingBtn />
          </Col>
        </Row> */}
        <div className="mb-3 d-flex flex-wrap">
          <h1>My Appointments</h1>

          <div className="ms-auto">
            <AddBookingBtn />
          </div>
        </div>
      </Container>

      <Container className="my-3">
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Text input with dropdown button"
            placeholder="Search"
          />
          <DropdownButton
            variant="secondary"
            title="Filter by"
            id="input-group-dropdown-2"
            align="end"
          >
            <Dropdown.Item as={Link} to="#">
              Service
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="#">
              Brand/Model
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="#">
              Booking Date
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="#">
              Status
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
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
          <>
            <Row>
              <Col sm={12}>
                <span>Total {countBooking()} bookings</span>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="flex-column">
                  {bookings &&
                    bookings.map((booking) => (
                      <BookingCard
                        key={booking._id}
                        booking={booking}
                        viewBooking={viewBooking}
                        editBooking={editBooking}
                      />
                    ))}
                </div>
              </Col>
            </Row>

            <Container className="d-flex justify-content-center">
              <UserBookingPagination />
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default UserBookings;
